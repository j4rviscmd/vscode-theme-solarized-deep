# Change Log

All notable changes to the "Solarized Deep" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.6] - 2026-05-06

### Fixed
- Revert tab.activeBorder from orange (#cb4b16) back to cyan (#2aa198)
- Darken statusBar.background from #000a0f to #000508 for better boundary visibility

### Changed
- Add CLAUDE.md to .gitignore and add .language file

## [0.1.5] - 2026-03-28

### Fixed
- Change active tab border color from cyan (#2aa198) to orange (#cb4b16) for improved visibility

### Changed
- Add GitHub Actions workflow to auto-add issues to project

## [0.1.4] - 2026-03-15

### Fixed
- Improve tab foreground color visibility by differentiating active/inactive tab states
  - `tab.inactiveForeground`: brightened from `#586e75` (base01) to `#839496` (base0) for better readability
  - `tab.unfocusedActiveForeground`: darkened from `#93a1a1` (base1) to `#586e75` (base01) to distinguish from focused active tab
- Improve selection highlight visibility in Quick Fix menu
  - `list.activeSelectionBackground`, `list.focusBackground`, `menu.selectionBackground`, `editorSuggestWidget.selectedBackground`: changed from near-black to `#0a4a5c` for better contrast

## [0.1.3] - 2026-01-05

### Changed
- Panel border color changed from background color to visible border (#021b26) for better visibility
- Added tab.unfocusedActiveBorder setting for unfocused active tab border

## [0.1.1] - 2025-12-31

### Changed
- Active tab border color changed from gray to cyan (#2aa198) for better visibility
- Warning colors unified to yellow (#b58900) for improved consistency across UI
  - inputValidation.warningBorder
  - list.warningForeground
  - notificationsWarningIcon.foreground
  - editorOverviewRuler.warningForeground
  - minimap.warningHighlight
  - editorMarkerNavigationWarning.background

## [0.1.0] - 2025-12-29

### Added
- Initial release
- Deeper, calmer dark theme based on Solarized Dark
- Editor background color set to `#000508` for enhanced darkness
- Comprehensive UI color definitions (200+ properties)
- Complete syntax highlighting definitions (35+ token scopes)
- Semantic token color support
- Maintains Solarized color palette
- Support for major languages including TypeScript, JavaScript, Python, JSON, CSS, Markdown, and more
- Git diff display color configuration
- Terminal ANSI 16-color definitions
