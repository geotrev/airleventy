# Airleventy

Build static websites with 11ty, Sass for CSS, and modern JavaScript.

Comes with a Netlify deploy config, but can be hosted anywhere.

## Increase your power levels

1. [Add favicons/device icons](https://www.favicon-generator.org/)
2. [Add a sitemap](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap)
3. [Configure eleventy](https://www.11ty.dev/docs/watch-serve/)

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

Or build production ready assets:

```sh
$ npm run build-prod
```

There are also a slew of individual commands to run individual build processes such as styles, scripts, etc.

## Netlify

First, enable your airleventy fork on Netlify's interface.

When prompted, clear the `build` and `publish` fields (that's what your `netlify.toml` is for). Then set your deploy branch (e.g., `main`).

Now each time you push to your deploy branch you'll also deploy your most recent changes. 🎉

## JavaScript

Adding JS is pretty straightforward, but has prescriptions on file structure & naming:

-   All JS is processed through rollup with a basic Babel configuration using `preset-env`. Configure this and the accompanying `.browserslistrc` as you please.
-   Any JS file _without_ an underscore prefix is treated as an asset (included in file output). Its file path is mirrored in the output.
-   Any JS file _with_ an underscore prefix is treated as a non-asset module (no output file).
