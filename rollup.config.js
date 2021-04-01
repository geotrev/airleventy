// Find plugins: https://github.com/rollup/awesome

import glob from "glob"
import path from "path"
import { terser } from "rollup-plugin-terser"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"

/**
 * This is a simple build pipeline for JavaScript files.
 *
 * It works by checking for any `.js` files without a leading `_`
 * in the name. If so, rollup processes the file using
 * the defined babel configuration and spits it out (folder
 * paths in tact) in the project's dist folder.
 *
 * It's intended to be simple and get out of the way as much
 * as possible. Unlike other front-end pipelines, this one
 * does not associate file names to any particular layout
 * or view. Developers have full control over which files
 * get loaded by requiring them to add a script tag.
 *
 * Additionally, the npm scripts are set up to process
 * scripts using terser for additional optimization when
 * the build is in "production" mode (see `netlify.tml`
 * and `package.json`).
 */

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

const inputs = scriptFiles.reduce((files, input) => {
	const parts = input.split("assets/js/")
	const fileKey = parts[parts.length - 1]
	return { [fileKey]: absolutePath(input), ...files }
}, {})

const inputPaths = Object.keys(inputs)

const outputs = inputPaths.reduce((files, file) => {
	const inputPath = inputs[file]
	const parts = inputPath.split("/")
	const pathIndex = parts.indexOf("js") + 1
	const outputPath = parts.slice(pathIndex).join("/")
	return { [file]: absolutePath(scriptsTarget + outputPath), ...files }
}, {})

const bundles = inputPaths.map((key) => {
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
