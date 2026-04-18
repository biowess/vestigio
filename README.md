# Vestigio

A luxurious, local-first Markdown writing environment with live preview, local file management, and polished PDF export.

[![Live Demo](https://img.shields.io/badge/Live-Demo-black?style=for-the-badge\&logo=github)](https://biowess.github.io/vestigio)

![Build Status](https://img.shields.io/badge/build-unknown-lightgrey)
![Version](https://img.shields.io/badge/version-0.0.0-blue)
![License](https://img.shields.io/badge/license-unspecified-lightgrey)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20TypeScript%20%7C%20Vite-61dafb)
![Framework](https://img.shields.io/badge/framework-React-61dafb)

## What it does

Vestigio is a browser-based manuscript editor designed for focused writing. It lets you write in Markdown, preview the formatted result in real time, manage saved documents locally, and export your work as Markdown or PDF.

## Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* React Markdown + remark-gfm
* Motion
* React-PDF
* localStorage for local document persistence

## Features

* Live Markdown editing with formatted preview
* Local document saving, loading, and deletion
* Markdown toolbar shortcuts for common formatting
* Undo / redo history
* Auto-save support
* Markdown export
* Print support
* High-fidelity PDF export
* Adjustable writing settings (font size, parchment warmth)
* Distraction-free, editorial-style UI

## Getting Started

### Prerequisites

* Node.js
* npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app will run on the Vite development server.

### Optional environment setup

```bash
cp .env.example .env.local
```

## Usage

1. Open the live app or run locally
2. Write Markdown in the editor
3. Use the toolbar for formatting
4. Save documents locally
5. Export as Markdown, print, or PDF

Example:

```md
# A Manuscript Title

This is **bold** text and this is *italic* text.

- One
- Two
- Three
```

## Project Structure

```txt
src/
  components/
  context/
  lib/
  pages/
  pdf/
```

## Contributing

Contributions are welcome. Keep PRs focused and aligned with the project's style.

## License

<your-license>

## Contact / Credits

Built by Biowess biowess@proton.me
