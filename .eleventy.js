module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget("./assets/sass")
	eleventyConfig.addWatchTarget("./assets/js")

	eleventyConfig.addPassthroughCopy("./assets/dist")

	eleventyConfig.addWatchTarget("./assets/img")
	eleventyConfig.addPassthroughCopy("./assets/img")

	return {
		passthroughFileCopy: true,
	}
}
