# Color Sudoku

A fun and colorful Sudoku puzzle game with multiple variants including colors, numbers, letters, and emojis.

## Project Structure

This repository contains two versions of the Color Sudoku game:

### 1. Web App (Original)
- **File:** `Color_Sudoku.html`
- Single-file web application
- Can be opened directly in any modern web browser
- Desktop and mobile browser compatible

### 2. Android App (Cordova)
- **Directory:** `cordova-app/`
- Full Cordova Android application
- Mobile-optimized UI with touch controls
- Can be built as a standalone Android APK

## Features

- **Multiple Game Modes:**
  - 🎨 Colors - Colorful squares
  - 🔢 Numbers - Classic 1-9
  - 🔤 Letters - A-I variant
  - 😊 Emojis - Fun emoji symbols

- **Difficulty Levels:**
  - Easy - More pre-filled cells
  - Medium - Moderate challenge
  - Hard - Expert level

- **Interactive Gameplay:**
  - Drag and drop symbols
  - Touch-friendly controls (mobile)
  - Real-time validation
  - Cell counter

## Quick Start

### Web App

Simply open `Color_Sudoku.html` in your web browser:

```bash
open Color_Sudoku.html
# or
firefox Color_Sudoku.html
```

### Android App

See the [Cordova App README](cordova-app/README.md) for detailed build and installation instructions.

Quick start:
```bash
cd cordova-app
npm install
npm run build
npm run run  # Run on connected device
```

## Requirements

### Web App
- Any modern web browser (Chrome, Firefox, Safari, Edge)

### Android App
- Node.js (v14 or higher)
- Apache Cordova
- Android Studio with Android SDK
- JDK 11 or higher

## How to Play

1. Choose your preferred game mode (Colors, Numbers, Letters, or Emojis)
2. Select a difficulty level
3. Fill the grid by dragging symbols from the palette to empty cells
4. Each row, column, and 3×3 box must contain all 9 symbols exactly once
5. Check your solution when complete

## Mobile Features (Cordova App)

- **Touch-Optimized:** Large, tap-friendly buttons and controls
- **Responsive Design:** Adapts to all screen sizes
- **Portrait Mode:** Optimized for portrait orientation
- **Smooth Animations:** CSS transitions for better UX
- **Dual Input:** Supports both drag-and-drop and tap-to-place
- **Long Press:** Clear cells with a long press

## Development

### Web App

The web app is a single HTML file with embedded CSS and JavaScript. To modify:

1. Open `Color_Sudoku.html` in your code editor
2. Make changes to the HTML, CSS, or JavaScript
3. Save and refresh in your browser

### Android App

For Android app development:

1. Navigate to `cordova-app/`
2. Edit files in the `www/` directory
3. Run `cordova prepare` to sync changes
4. Build and test: `npm run build && npm run run`

See [cordova-app/README.md](cordova-app/README.md) for more details.

## Project History

- Original web app created as a single-file HTML application
- Converted to Cordova Android app with mobile optimizations
- Added touch controls and responsive design for mobile devices

## License

MIT License

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
