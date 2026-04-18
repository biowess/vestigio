# Vestigio

![Version](https://img.shields.io/badge/version-v1.0.0-7c3aed?style=for-the-badge&logo=semanticrelease&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-10b981?style=for-the-badge&logo=opensourceinitiative&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-Enabled-000000?style=for-the-badge&logo=markdown&logoColor=white)
![React PDF](https://img.shields.io/badge/React_PDF-7.x-ef4444?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_the_app-111827?style=for-the-badge&logo=github&logoColor=white)](https://biowess.github.io/vestigio)

![Vestigio preview](assets/sc1.png)

A luxurious, local-first Markdown writing environment with live preview, local file management, and polished PDF export.

## What it does

Vestigio is a browser-based manuscript editor built for calm, focused writing. It combines a refined Markdown editor, real-time preview, local document management, and high-quality export tools into one polished workspace.

It is designed to feel fast, private, and distraction-free, with everything stored locally in your browser.

## Tech Stack

- React 19
- TypeScript 5.x
- Vite 5.x
- Tailwind CSS 3.x
- HTML5
- CSS3
- React Router
- React Markdown
- remark-gfm
- Motion
- React PDF
- localStorage for local persistence

## Features

- Live Markdown editing with instant formatted preview
- Local document saving, loading, renaming, and deletion
- Toolbar shortcuts for common Markdown formatting
- Undo and redo history
- Auto-save support
- Markdown export
- Print support
- High-fidelity PDF export
- Adjustable writing settings, including font size and parchment warmth
- Editorial, distraction-free interface
- Local-first workflow with no account required

## Getting Started

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
````

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

1. Open the live app or run it locally.
2. Write in Markdown in the editor.
3. Use the toolbar for quick formatting.
4. Save documents locally.
5. Export your work as Markdown, print it, or generate a PDF.

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
assets/
  sc1.png
```

## Contributing

Contributions are welcome. Keep pull requests focused, intentional, and aligned with the project’s visual language and writing-first experience.

## License

Released under the MIT License.

## Contact / Credits

Built by Biowess
[biowess@proton.me](mailto:biowess@proton.me)
