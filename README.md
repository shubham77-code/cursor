# NewsTOP AI

A lightweight AI-news scroller inspired by short-form news apps like Inshorts.

## If you're confused: where is my project?

No stress ❤️ this is normal.

Your project is the folder that contains these files:
- `index.html`
- `styles.css`
- `app.js`
- `README.md`

### If you used GitHub website only
You probably need to download it first:
1. Open your repo on GitHub.
2. Click **Code** → **Download ZIP**.
3. Extract the ZIP.
4. Open that extracted folder.

### If you used GitHub Desktop
1. Open GitHub Desktop.
2. Right-click the repo name.
3. Click **Show in Explorer**.

### If you used VS Code
1. Open VS Code.
2. File Explorer panel shows your project files.
3. Right-click the project root → **Reveal in File Explorer**.

## Fastest way to open app (no install)

Because this is a static web app, you can simply double-click `index.html`.

## Run with local server (recommended)

### Windows
If Python is installed:

```bash
py -m http.server 8000
```

or

```bash
python -m http.server 8000
```

Then open: `http://localhost:8000`

### macOS / Linux

```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## If terminal says “Python was not found”

Install Python from https://www.python.org/downloads/ and during setup check:
- **Add Python to PATH**

Then close terminal, reopen, and try again.

## Features

- Full-screen vertical scroll (one news per screen)
- One photo background per story (loaded from web URLs)
- One-click refresh to reshuffle stories
- Mobile-friendly layout
