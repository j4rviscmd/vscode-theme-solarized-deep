# Solarized Deep

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![VS Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/j4rviscmd.solarized-deep?logo=visualstudiocode&logoColor=fff)](https://marketplace.visualstudio.com/items?itemName=j4rviscmd.solarized-deep)
[![VS Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/j4rviscmd.solarized-deep?logo=visualstudiocode&logoColor=fff)](https://marketplace.visualstudio.com/items?itemName=j4rviscmd.solarized-deep)
[![VS Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/j4rviscmd.solarized-deep?logo=visualstudiocode&logoColor=fff)](https://marketplace.visualstudio.com/items?itemName=j4rviscmd.solarized-deep)

A calmer, refined VSCode dark theme based on Solarized Dark, with an adjustable depth blend between the classic Solarized Deep and the Osaka palette.

## Screenshots

![Solarized Deep Theme Preview](./screenshots/preview.png)

## Star this repo to keep me motivated ⭐

I build this in my spare time. Every star shows that my work is valued and keeps me going!

![Star](docs/images/star-github.gif)

## Features

- **Adjustable Depth**: Tune the theme's darkness from your settings — from the classic Solarized Deep (0%) to the Osaka palette (100%). Default is 80%.
- **Calm Color Palette**: Eye-friendly colors optimized for extended coding sessions
- **Solarized Base**: Maintains the proven color hues of the Solarized color scheme
- **Comprehensive Syntax Highlighting**: Extensive token color definitions for major programming languages
- **Semantic Highlighting**: Full support for semantic token colors in TypeScript, JavaScript, and more

## Installation

### From VSCode Marketplace

1. Open VSCode
2. Open Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "Solarized Deep"
4. Click Install

Or install directly from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=j4rviscmd.solarized-deep)

### Local Development & Testing

```bash
# Clone the repository
git clone https://github.com/j4rviscmd/vscode-theme-solarized-deep.git
cd vscode-theme-solarized-deep

# Copy to VSCode extensions directory
cp -r . ~/.vscode/extensions/solarized-deep
# or
# command palette -> Start Debugging

# Restart VSCode
```

## Activating the Theme

1. Press `Cmd+K Cmd+T` (macOS) or `Ctrl+K Ctrl+T` (Windows/Linux)
2. Select **Solarized Deep** from the list

Or configure via settings:

```json
{
  "workbench.colorTheme": "Solarized Deep"
}
```

## Adjustable Depth

The theme ships at 80% — a blend of the classic Solarized Deep and the Osaka palette. Fine-tune the depth in your settings:

```json
{
  "solarizedDeep.depth": 80
}
```

- `0` = classic Solarized Deep (darkest)
- `100` = Osaka palette (lightest)
- `80` (default) = balanced blend

The adjustment affects the theme's background, foreground, borders, and selection colors. Syntax colors (keywords, strings, functions, etc.) stay fixed. Changes apply in real time — no reload needed.

## Color Palette (default, depth = 80)

A blend of the classic Solarized Deep and the Osaka palette:

- **Base**:
  - `#001218` (background)
  - `#A8B3B3` (foreground)
  - `#002833` (borders, selection, active tabs)
  - `#175D63` (selection highlights)
- **Accent Colors** (Solarized):
  - Green: `#859900` (keywords)
  - Cyan: `#2aa198` (strings)
  - Blue: `#268bd2` (functions)
  - Yellow: `#b58900` (classes)
  - Orange: `#cb4b16` (constants)
  - Red: `#dc322f` (errors)

## License

MIT License

Copyright (c) 2025 j4rviscmd

See the [LICENSE](./LICENSE) file for details.
