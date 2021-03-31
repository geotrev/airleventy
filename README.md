# Airleventy

Inspired by [Possibly the Easiest Way to Run An SSG](https://css-tricks.com/possibly-the-easiest-way-to-run-an-ssg/).

Write static websites. 11ty with minimal tooling extensions. Write with Sass & modern JS.

Out of the box Netlify deploys. Includes mini CSS reset by Eric Meyer.

## Increase your power levels

5. [Add favicons/device icons](https://www.favicon-generator.org/)
6. [Add a sitemap](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap)
7. [Configure eleventy](https://www.11ty.dev/docs/watch-serve/)

## Setup

```shell
$ npm i
```

## Commands

### Develop

```sh
$ npm run watch
```

### Build

```sh
$ npm run build
```

There are also a slew of individual commands to run individual build processes such as styles, scripts, etc.

## Netlify

First, enable your Eleventy Skeleton repo on Netlify's interface.

When prompted, clear the `build` and `publish` fields (that's what your `netlify.toml` is for). Then set your deploy branch (e.g., `main`).

Now each time you push to your deploy branch you'll also deploy your most recent changes. 🎉
