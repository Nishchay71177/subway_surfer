# 🚇 Subway Surfers - WebGL Endless Runner

An exciting endless runner game built with **HTML, CSS, JavaScript, and JSON** - no database required! All game data is stored locally using browser's localStorage.

## 🎮 Play the Game

### Quick Start
1. Open `index.html` in your web browser to see the home page
2. Click "PLAY NOW" or directly open `game.html` to start playing
3. For instructions, open `instructions.html`

### Online Play
Simply open any of the HTML files in a modern web browser. No server or installation required!

## 🎯 Game Controls
* **Jump**: Space Bar / Up Arrow Key
* **Move Left**: A Key / Left Arrow Key  
* **Move Right**: D Key / Right Arrow Key

## ✨ Features

### Core Gameplay
- ✅ Endless runner gameplay with WebGL 3D graphics
- ✅ Smooth character movement and physics
- ✅ Dynamic obstacle generation (barriers, containers, trains)
- ✅ Coin collection system
- ✅ Power-ups (Fly Boost, Jump Boost)
- ✅ Background music and sound effects
- ✅ Increasing difficulty over time

### Data Persistence
- 📊 **High Score Tracking** - Beat your best score!
- 🪙 **Total Coins Collected** - Lifetime coin counter
- 🎮 **Games Played** - Track how many times you've played
- 📏 **Total Distance** - Combined distance traveled
- 💾 **Local Storage** - All data saved in your browser
- 📈 **Real-time Stats Display** - See your progress

### No Database Required
All game data is stored using browser's `localStorage` API. Your progress persists across sessions without needing any backend server or database!

## Directory Structure
```
.
├── assets
│   ├── barrier.jpg
│   ├── bgmusic.mp3
│   ├── coin.png
│   ├── container.jpeg
│   ├── container.jpg
│   ├── finish.jpg
│   ├── flyboost.jpg
│   ├── ground.png
│   ├── jumpboost.png
│   ├── player.png
│   ├── police.png
│   ├── track.jpeg
│   ├── train.jpg
│   └── wall.jpg
├── game.html
├── libs
│   ├── gl-matrix.js
│   ├── jquery-3.3.1.min.js
│   └── webgl-utils.js
├── LICENSE
├── README.md
├── src
│   ├── barrier.js
│   ├── boost.js
│   ├── camera.js
│   ├── coin.js
│   ├── draw.js
│   ├── finishline.js
│   ├── ground.js
│   ├── keyhandler.js
│   ├── main.js
│   ├── obstacle.js
│   ├── player.js
│   ├── police.js
│   ├── texture.js
│   ├── track.js
│   ├── utility.js
│   └── wall.js
└── style.css
```

## Bonus
* Background music throughout the game
* Textures for all objects
* Lighting used with ambience lighting & directional lighting

## Note
* Run the game on Firefox (tested). Google Chrome causes CORS error and code currently does not handle that error.
* For best experience, maximize the window size and play.
