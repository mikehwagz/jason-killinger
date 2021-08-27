# Jason Killinger

Made with [sane-eleventy](https://github.com/selfawarestudio/sane-eleventy) ![Prerequisite](https://img.shields.io/badge/node-12.18.2-red.svg) ![Prerequisite](https://img.shields.io/badge/yarn-1.22.4-blue.svg)

## 📖 About

- Templates are authored in the [`templates`](templates) directory using any template language supported by eleventy (Nunjucks by default)
- Eleventy global data files live in [`data`](data).
- Styles are authored using Tailwind and the entry point lives in [`styles`](styles/index.css). We **always** leverage Tailwind utilities before resorting to adding custom styles.
- JavaScript lives in [`scripts`](scripts)
- Place any static files in the [`public`](public) folder
- Place any eleventy related utilities in [`lib`](lib)
- Sanity Studio lives in the [`studio`](studio) directory

## ✨ Install

```sh
# Install Yarn
npm i -g yarn

# Install project dependencies using yarn
yarn

# Install Sanity Studio dependencies using yarn
cd studio && yarn
```

## 👩🏻‍💻 Usage

To set up with Sanity, you will need to set your Sanity `projectId` and `dataset` in two places:

1. [`studio/sanity.json`](studio/sanity.json)
2. [`lib/sanity.js`](lib/sanity.js)

### Development

```sh
# Start eleventy dev server
yarn dev

# Start Sanity dev server
cd studio && yarn start
```

### Production

```sh
# Build front-end for production
yarn build
```

### Deployment

Deploy the front-end using Netlify by pushing to the `main` branch.
