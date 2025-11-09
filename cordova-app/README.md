# Color Sudoku - Cordova Android App

A fun and colorful Sudoku puzzle game with multiple variants including colors, numbers, letters, and emojis. Built with Apache Cordova for Android devices.

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

- **Mobile-Optimized UI:**
  - Touch-friendly controls
  - Responsive design for all screen sizes
  - Portrait orientation optimized
  - Smooth animations and transitions
  - Tap-to-select and drag-and-drop support

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Apache Cordova](https://cordova.apache.org/) (`npm install -g cordova`)
- [Android Studio](https://developer.android.com/studio) with Android SDK
- Java Development Kit (JDK) 11 or higher

### Android SDK Setup

1. Install Android Studio
2. Open Android Studio and install the Android SDK
3. Set the `ANDROID_HOME` environment variable:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

## Installation

1. Navigate to the project directory:
   ```bash
   cd cordova-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify the Android platform is added:
   ```bash
   cordova platform ls
   ```

## Building the App

### Development Build

Build the APK for testing:

```bash
npm run build
# or
cordova build android
```

The APK will be located at:
`platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### Release Build

For production release:

```bash
npm run build:release
# or
cordova build android --release
```

The release APK will be located at:
`platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`

**Note:** You'll need to sign the release APK before distributing it.

## Running the App

### On a Connected Device

1. Enable USB debugging on your Android device
2. Connect the device via USB
3. Run:
   ```bash
   npm run run
   # or
   cordova run android
   ```

### On an Emulator

1. Create an Android Virtual Device (AVD) in Android Studio
2. Start the emulator
3. Run:
   ```bash
   npm run emulate
   # or
   cordova emulate android
   ```

## Testing in Browser

For quick testing during development:

```bash
npm run serve
# or
cordova serve
```

Then open `http://localhost:8000` in your browser.

**Note:** Some Cordova features won't work in the browser, but the game mechanics will function.

## Project Structure

```
cordova-app/
├── config.xml          # Cordova configuration
├── package.json        # Node.js dependencies and scripts
├── www/                # Web app source code
│   ├── index.html     # Main HTML file
│   └── js/
│       └── index.js   # Game logic
├── platforms/          # Platform-specific builds (auto-generated)
│   └── android/
└── plugins/           # Cordova plugins (auto-generated)
```

## How to Play

1. **Select a Game Mode:** Choose between Colors, Numbers, Letters, or Emojis
2. **Choose Difficulty:** Pick Easy, Medium, or Hard
3. **Fill the Grid:**
   - **Drag & Drop:** Drag symbols from the palette to cells
   - **Tap to Place:** Tap a symbol, then tap a cell to place it
   - **Long Press:** Long press a cell to clear it
4. **Check Solution:** Tap the "Check" button to verify your solution
5. **New Game:** Start a fresh puzzle anytime

## Game Rules

- Each row must contain all 9 symbols exactly once
- Each column must contain all 9 symbols exactly once
- Each 3×3 box must contain all 9 symbols exactly once
- Pre-filled cells (shown with a different background) cannot be changed

## Mobile Optimizations

- **Touch-Friendly:** All buttons meet the 48dp minimum touch target size
- **Responsive Layout:** Adapts to different screen sizes and orientations
- **Portrait Locked:** Optimized for portrait orientation
- **No Text Selection:** Prevents accidental text selection during gameplay
- **Smooth Animations:** CSS transitions for better user experience
- **Active States:** Visual feedback for all touch interactions

## Troubleshooting

### Build Fails

- Ensure Android SDK is properly installed and `ANDROID_HOME` is set
- Check that you have the required Android SDK platforms installed
- Run `cordova requirements` to check for missing dependencies

### App Won't Run on Device

- Enable USB debugging on your device
- Accept the USB debugging prompt on your device
- Check that `adb devices` shows your device

### Gradle Build Issues

- Update Gradle: `cd platforms/android && ./gradlew wrapper --gradle-version=8.0`
- Clear Gradle cache: `rm -rf ~/.gradle/caches`

## Development

To modify the app:

1. Edit files in the `www/` directory
2. Run `cordova prepare` to copy changes to platforms
3. Build and test: `npm run build && npm run run`

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - See LICENSE file for details

## Credits

Built with Apache Cordova
