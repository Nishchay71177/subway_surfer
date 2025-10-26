# 🚇 Subway Surfers - WebGL Endless Runner

An exciting endless runner game built with **WebGL, HTML5, CSS, and JavaScript**. All game data is stored locally using browser's localStorage - no database or server required!

## 🎮 Quick Start

1. Open `index.html` in your web browser to see the home page
2. Click "PLAY NOW" or directly open `game.html` to start playing
3. Enjoy the game in any modern web browser (Firefox recommended)

## 🎯 Game Controls

* **Jump**: Spacebar or Up Arrow (↑)
* **Move Left**: A Key or Left Arrow (←)
* **Move Right**: D Key or Right Arrow (→)
* **Pause/Resume**: ESC Key

## ✨ Features

### Gameplay
- Endless runner with WebGL 3D graphics
- Smooth character movement with lane transitions
- Dynamic obstacle generation (barriers, containers, trains)
- Collectible coins
- Fly Boost power-up
- Background music and sound effects
- Progressive difficulty increase

### Progress Tracking
- 📊 High score tracking
- 🪙 Total coins collected
- 🎮 Games played counter
- 📏 Total distance traveled
- 💾 All data persists in browser localStorage

## 🗂️ Project Structure

```
├── assets/           # Game textures and audio
├── css/              # Stylesheets
├── libs/             # External libraries (jQuery, gl-matrix, WebGL utils)
├── src/
│   ├── auth.js           # User authentication
│   ├── barrier.js        # Barrier obstacles
│   ├── camera.js         # Camera controls
│   ├── coin.js           # Coin collectibles
│   ├── finishline.js     # Finish line logic
│   ├── game-engine.js    # Main game engine & loop
│   ├── ground.js         # Ground plane
│   ├── helpers.js        # Utility/helper functions
│   ├── input-handler.js  # Keyboard input handling
│   ├── obstacle.js       # Obstacle generation
│   ├── player.js         # Player character logic
│   ├── powerup.js        # Power-up system (fly boost)
│   ├── renderer.js       # WebGL rendering engine
│   ├── storage.js        # LocalStorage management
│   ├── texture-loader.js # Texture loading system
│   ├── track.js          # Track generation
│   └── wall.js           # Side walls
├── game.html         # Main game page
├── index.html        # Landing page
├── login.html        # Login page
├── register.html     # Registration page
└── rankings.html     # Leaderboard page
```

## 🎨 Technical Features

- WebGL 3D graphics with texture mapping
- Ambient and directional lighting
- Collision detection
- Physics-based jumping mechanics
- LocalStorage-based persistence
- Responsive UI

## 📝 Notes

- **Browser Compatibility**: Best on Firefox. Chrome may have CORS issues with local files.
- **Performance**: Maximize window for best experience.
- **No Installation**: Runs entirely in the browser, no server needed!

## 📄 License

See LICENSE file for details.
