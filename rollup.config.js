// Find plugins: https://github.com/rollup/awesome

import glob from "glob"
import path from "path"
import { terser } from "rollup-plugin-terser"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"

const terserPlugin = terser({
	output: {
		comments: (_, comment) => {
			const { value, type } = comment

			if (type === "comment2") {
				return /@preserve|@license|@cc_on/i.test(value)
			}
		},
	},
})

const absolutePath = (dirPath) => path.resolve(__dirname, dirPath)
const scriptFiles = glob.sync(absolutePath("assets/js/**/!(_)*.js"))
const scriptsTarget = "assets/dist/js/"

console.log("script files detected:", scriptFiles)

const inputs = scriptFiles.reduce((files, input) => {
	const parts = input.split("assets/js/")
	const fileKey = parts[parts.length - 1]
	return { [fileKey]: absolutePath(input), ...files }
}, {})

const outputs = Object.keys(inputs).reduce((files, file) => {
	const inputPath = inputs[file]
	const parts = inputPath.split("/")
	const pathIndex = parts.indexOf("js") + 1
	const outputPath = parts.slice(pathIndex).join("/")
	return { [file]: absolutePath(scriptsTarget + outputPath), ...files }
}, {})

console.log("outputs:", outputs)

const bundles = Object.keys(inputs).map((key) => {
	const prodEnv = process.env.BABEL_ENV === "production"

	const plugins = [
		nodeResolve(),
		commonjs(),
		babel({
			babelHelpers: "bundled",
			exclude: "node_modules/**",
			comments: false,
		}),
	]

	let sourcemap = true

	if (prodEnv) {
		plugins.push(terserPlugin)
		sourcemap = false
	}

	return {
		input: inputs[key],
		output: {
			file: outputs[key],
			format: "iife",
			sourcemap,
		},
		plugins,
	}
})

export default bundles
