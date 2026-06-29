# MarkLive Presentations

A fully offline, zero-dependency markdown editor built for live presentations. Write in markdown and see a clean formatted board in real time — no internet required.

## ✨ Features

- **Live markdown rendering** — type and see formatted output instantly
- **Multi-page support** — create unlimited pages per presentation
- **Page-aware export/import** — save all pages in one `.md` file and reimport them with pages intact
- **Fully offline** — installable as a PWA, works with no internet connection
- **Mobile friendly** — responsive toolbar and sticky navigation for phones and tablets
- **No dependencies** — pure HTML + JavaScript, zero external libraries or frameworks
- **Formatting menu** — press `\` or `Ctrl+\` for a searchable format picker
- **Batch edit mode** — select and reformat multiple lines at once

## 🚀 Quick Start

Open [the live app](https://YOUR-USERNAME.github.io/marklive-presentations/) or download and open `index.html` directly in any modern browser.

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
| --- | --- |
| Formatting menu | `\` or `Ctrl+\` |
| Bold | `Ctrl+B` |
| Italic | `Ctrl+I` |
| Underline | `Ctrl+U` |
| Strikethrough | `Ctrl+Shift+X` |
| Link | `Ctrl+K` |
| Exit inline format | `]` |
| Undo | `Ctrl+Z` |
| Redo | `Ctrl+Y` |
| Save current page | `Ctrl+S` |
| Previous page | `Ctrl+←` |
| Next page | `Ctrl+→` |

## 📄 Page-Aware Save & Import

- **Save .md** — saves the current page only
- **Save All** — saves all pages in one `.md` file with embedded page markers
- **Import** — automatically detects multi-page exports and restores each page

## 📱 Install as PWA (Android / iOS)

On Android (Chrome): tap the browser menu → *Add to Home Screen*  
On iOS (Safari): tap Share → *Add to Home Screen*

Once installed, the app works completely offline.

## 🔄 Releasing an update

Installed copies of the app update themselves — no need to uninstall/reinstall:

1. Add a new entry to the **top** of the `CHANGELOG` array near the top of the main `<script>` in `index.html`, describing what changed/what was fixed. This also drives the in-app **"What's new"** dialog (tap the version badge next to the app name).
2. Bump `SW_VERSION` in `sw.js` to the same version string.

Step 2 matters: changing `sw.js`'s bytes is what makes browsers notice a new service worker exists and install it, which rotates the offline cache. Whenever the device is online, the app also always fetches the latest `index.html` from the server first (network-first), so most content changes show up immediately regardless — the version bump just makes the *offline* cache and the "what's new" prompt line up with it.

When an update finishes installing in the background, a small "Update ready · Reload" banner appears so the user can apply it whenever's convenient — it never reloads on its own, since unsaved presentation content isn't auto-saved.

## 🗂 Project Structure

```
marklive-presentations/
├── index.html      ← entire app (HTML + CSS + JS, no build step)
├── manifest.json   ← PWA manifest
├── sw.js           ← service worker for offline caching
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## 🌐 Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Your app will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`

## License

MIT — free to use, fork, and modify.
