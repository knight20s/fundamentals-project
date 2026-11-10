# Best Shop

Multi-page luggage store built from a Figma mockup with HTML, SCSS and TypeScript.

## Requirements

- Node.js 20 or newer
- npm (comes with Node.js)

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` compiles SCSS and TypeScript into `dist`, keeps watching both for changes and starts a local server with live reload. The home page (`src/index.html`) opens in the browser automatically.

A local server is required: product data is loaded from `src/assets/data.json` with `fetch`, which does not work when pages are opened as files.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | compile, watch and start the dev server |
| `npm run compile` | one-time build of SCSS and TypeScript |
| `npm run compile:scss` | SCSS → `dist/css` |
| `npm run compile:ts` | TypeScript → `dist/js` |

## Project structure

```
src/
  index.html     home page
  html/          other pages (catalog, product, about, contact, cart)
  scss/          styles: abstracts, base, components, layouts, pages
  ts/            TypeScript source
  assets/        data.json with products
  img/, fonts/
dist/            compiled CSS and JS (generated)
```
