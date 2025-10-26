# Train Run - File Documentation

## Table of Contents
1. [HTML Files](#html-files)
2. [JavaScript Source Files](#javascript-source-files)
3. [CSS Files](#css-files)
4. [External Libraries](#external-libraries)
5. [Assets](#assets)
6. [Architecture Overview](#architecture-overview)

---

## HTML Files

### 1. `index.html` - Landing Page
**Purpose**: Main entry point and home page for the game.

**Functionality**:
- Displays game title and welcome message
- Shows "PLAY NOW" button linking to game.html
- Navigation menu to other pages (register, login, rankings)
- Uses common.css and index.css for styling

**Key Elements**:
- Hero section with game branding
- Call-to-action button
- Responsive navigation bar

---

### 2. `game.html` - Main Game Page
**Purpose**: Core game interface where the actual gameplay occurs.

**Functionality**:
- Creates WebGL canvas (900x650px) for 3D rendering
- Displays real-time stats panel (distance, score, coins)
- Game over overlay with final stats and restart button
- Pause/resume functionality (ESC key)
- Loads all game scripts in correct order

**Script Loading Order**:
1. Storage and authentication
2. External libraries (gl-matrix, jQuery, webgl-utils)
3. Core utilities and helpers
4. Game objects and environment
5. Player logic and input handling
6. Rendering engine
7. Main game engine

**Key Elements**:
- `<canvas id="glcanvas">` - WebGL rendering surface
- Stats panel with live updates
- Game over modal
- Audio element for background music

---

### 3. `login.html` - User Login Page
**Purpose**: Authentication interface for returning users.

**Functionality**:
- Username/password input form
- Client-side validation
- Checks credentials against localStorage
- Redirects to game.html on success
- Links to registration page for new users

**Validation**:
- Required field checks
- Username format validation
- Password matching against stored data

---

### 4. `register.html` - User Registration Page
**Purpose**: New user account creation interface.

**Functionality**:
- Collects username, email, password
- Client-side form validation
- Stores user data in localStorage
- Prevents duplicate usernames
- Redirects to login after successful registration

**Validation Rules**:
- Username: 3-20 characters, alphanumeric
- Email: Valid email format
- Password: Minimum 6 characters

---

### 5. `rankings.html` - Leaderboard Page
**Purpose**: Displays top players and their statistics.

**Functionality**:
- Shows leaderboard table with rankings
- Displays: rank, username, high score, total coins, games played
- Sorts players by high score (descending)
- Shows current user's stats separately
- Updates dynamically from localStorage

**Features**:
- Top 10 players display
- Color-coded ranking badges
- Current user highlight
- Responsive table design

---

## JavaScript Source Files

### 1. `src/game-engine.js` - Main Game Engine
**Purpose**: Core game loop and orchestration.

**Key Functions**:
- `main()`: Initializes WebGL, shaders, and game state
- `render()`: Main game loop (60 FPS via requestAnimationFrame)
- `initShaderProgram()`: Compiles and links vertex/fragment shaders
- `initBuffers()`: Creates WebGL buffers for object geometry

**Global Variables**:
- Game state: `game_over`, `game_start`, `finish`
- Speed control: `speed`, `base_speed`, `speed_increase_rate`
- Visual effects: `flash`, `gray` (game over effects)
- Arrays: `objects`, `obstacles`, `coins`, `barriers`, `boosts`

**Shader Programs**:
- **Vertex Shader**: Handles 3D transformations, lighting calculations
- **Fragment Shader**: Applies textures, lighting, and color effects

**Game Loop Sequence**:
1. Update delta time
2. Increase speed gradually
3. Generate new objects (obstacles, coins, powerups)
4. Update all game objects (tick functions)
5. Check collisions
6. Render all objects
7. Update UI displays
8. Request next frame

---

### 2. `src/player.js` - Player Character Logic
**Purpose**: Manages player character state and behavior.

**Key Functions**:
- `player(gl)`: Creates player object with geometry and properties
- `player_tick()`: Updates player state each frame

**Player Properties**:
- Position: `translate` [x, y, z]
- Movement: `targetLane`, `isTransitioning`, `transitionSpeed`
- Physics: `speed_y`, `jump`, `jumpheight`
- Stats: `score`, `coins`, `distance`
- Powerups: `flyboost`

**Movement Logic**:
- **Lane Switching**: Smooth transitions between 3 lanes (-1.05, 0.0, 1.05)
- **Jumping**: 
  - Triggered by Spacebar or Up Arrow
  - Must be grounded to jump (jump == 0)
  - Gravity physics applied
  - Can jump over obstacles
- **Flying**: Activated by flyboost powerup (10 seconds)

**Collision Detection**:
- Checks against obstacles for jump requirements
- Ground collision for landing
- Triggers game over on obstacle hit

---

### 3. `src/game-objects.js` - Game Objects
**Purpose**: Defines all collectible and obstacle objects.

**Contains**:

#### A. `obstacle()` - Train/Container Obstacles
- Large obstacles that must be jumped over
- Two textures: train.jpg, container.jpg
- Dimensions: 0.4 x 0.9 x 1.2 units
- Position: y = -0.25 (ground level)

#### B. `barrier()` - Low Barriers
- Small barriers on the track
- Texture: barrier.jpg
- Dimensions: 0.28 x 0.14 x 0.07 units
- Position: y = -0.63 (very low)

#### C. `coin()` - Collectible Coins
- Spinning coins for points
- Texture: coin.png
- Dimensions: 0.2 x 0.2 x 0.03 units
- Rotation animation: continuous spin

#### D. `boost()` - Flyboost Powerup
- Flyboost cube powerup
- Texture: flyboost.jpg
- Dimensions: 0.2 x 0.2 x 0.2 units
- Effect: Allows flying for 10 seconds

**Tick Functions**:
- `obstacle_tick()`: Moves obstacles, checks collisions, respawns
- `barrier_tick()`: Similar for barriers
- `coin_tick()`: Handles coin collection, updates score
- `boost_tick()`: Handles powerup collection, activates effects

**Object Lifecycle**:
1. Spawn at z = -35 (far away)
2. Move forward each frame (z += speed)
3. Check player collision
4. Delete when z > 2 (behind player)
5. Respawn new object

---

### 4. `src/environment.js` - Environment Elements
**Purpose**: Creates game world environment.

**Contains**:

#### A. `ground()` - Ground Plane
- Large flat surface for the track
- Texture: ground.png
- Always follows player
- Position: y = -0.7 (below player)

#### B. `track()` - Track Segments
- Three parallel track lanes
- Texture: track.jpeg
- Continuously scrolling illusion
- `track_tick()`: Recycles track segments

#### C. `wall()` - Side Walls
- Left and right boundary walls
- Texture: wall.jpg
- Creates tunnel effect
- `wall_tick()`: Scrolls walls forward

**Environment Management**:
- Objects recycle to save memory
- Continuous scrolling effect
- Maintains consistent z-distance from player

---

### 5. `src/input-handler.js` - Keyboard Input
**Purpose**: Captures and processes keyboard input.

**Event Listeners**:
- `keydown`: Sets statusKeys[keyCode] = true
- `keyup`: Sets statusKeys[keyCode] = false

**Supported Keys**:
- **Arrow Keys**: 37 (←), 38 (↑), 39 (→), 40 (↓)
- **WASD**: 65 (A), 87 (W), 68 (D), 83 (S)
- **Space**: 32 (Jump)
- **ESC**: 27 (Pause/Resume)

**Key Mapping**:
- Left Arrow / A → Move to left lane
- Right Arrow / D → Move to right lane
- Up Arrow / Space → Jump
- ESC → Pause/Resume game

**Features**:
- Prevents default browser behavior for game keys
- Global `statusKeys` object tracks all key states
- Checked each frame in player_tick()

---

### 6. `src/renderer.js` - WebGL Rendering Engine
**Purpose**: Handles all WebGL rendering operations.

**Key Functions**:

#### `initBuffers(gl, object)`
Creates WebGL buffers for object geometry:
- Position buffer (vertices)
- Normal buffer (lighting)
- Texture coordinate buffer
- Index buffer (triangles)

#### `drawScene(gl, programInfo, buffers, deltaTime, projectionMatrix, object, texture)`
Renders a single object:
1. Clears canvas (first call only)
2. Sets up projection matrix (perspective)
3. Creates model-view matrix (object transforms)
4. Applies rotation and translation
5. Binds texture
6. Draws triangles

**Matrix Operations**:
- Perspective projection (field of view: 45°)
- Camera positioning
- Object transformations (translate, rotate)
- Normal matrix for lighting

**Rendering Pipeline**:
1. Set viewport
2. Clear color and depth buffers
3. Enable depth testing
4. For each object:
   - Set uniforms (matrices, texture, lighting)
   - Bind buffers
   - Draw elements

---

### 7. `src/finishline.js` - Finish Line Logic
**Purpose**: Creates finish line when score reaches 100.

**Functionality**:
- `finishline(gl)`: Creates finish line object
- `finishline_tick()`: Moves finish line toward player
- Triggers win condition when player crosses

**Finish Line Properties**:
- Texture: finish.jpg
- Spawns at z = -35 when score >= 100
- Moves forward to meet player
- Sets `finish = true` when reached

---

### 8. `src/core-utils.js` - Utility Functions
**Purpose**: Helper functions and utilities.

**Contains**:

#### A. Helper Functions
- `getRandomInt(min, max)`: Random integer generator
- `degToRad(degrees)`: Converts degrees to radians

#### B. Camera Functions
- `cameraLogic()`: Calculates camera position
- Positions camera behind and above player
- Smooth camera following

#### C. Texture Loading
- `loadTexture(gl, url)`: Loads image textures
- Creates WebGL texture objects
- Handles async image loading
- Sets texture parameters (filtering, wrapping)

**Texture Configuration**:
- MIN_FILTER: LINEAR_MIPMAP_LINEAR
- MAG_FILTER: LINEAR
- Generates mipmaps for quality
- Placeholder color until loaded

---

### 9. `src/storage.js` - LocalStorage Management
**Purpose**: Handles all data persistence.

**Key Functions**:

#### `saveGameStats(username, score, coins, distance)`
- Updates user's high score if beaten
- Increments total coins and distance
- Increments games played counter
- Stores in localStorage

#### `getUserStats(username)`
- Retrieves user statistics
- Returns: highScore, totalCoins, gamesPlayed, totalDistance
- Returns defaults if user not found

#### `getAllUserStats()`
- Gets all users' statistics
- Used for leaderboard/rankings
- Returns array of user objects

**Data Structure**:
```javascript
{
  username: string,
  email: string,
  password: string,
  highScore: number,
  totalCoins: number,
  gamesPlayed: number,
  totalDistance: number
}
```

**Storage Keys**:
- `users`: Array of all user objects
- `currentUser`: Currently logged-in username

---

### 10. `src/auth.js` - Authentication
**Purpose**: User authentication and session management.

**Key Functions**:

#### `registerUser(username, email, password)`
- Validates input fields
- Checks for existing username
- Creates new user object
- Saves to localStorage
- Returns success/error

#### `loginUser(username, password)`
- Validates credentials
- Sets currentUser in localStorage
- Returns success/error

#### `getCurrentUser()`
- Returns username of logged-in user
- Returns null if not logged in

#### `logoutUser()`
- Removes currentUser from localStorage
- Redirects to login page

**Validation**:
- Username: 3-20 characters, letters/numbers/underscore
- Email: Valid email format (regex)
- Password: Minimum 6 characters
- Duplicate username prevention

---

## CSS Files

### 1. `css/common.css` - Shared Styles
**Purpose**: Global styles used across all pages.

**Contains**:
- CSS Reset and normalization
- Navigation bar styles
- Typography and colors
- Button styles
- Card/container styles
- Responsive utilities
- Color scheme variables

**Design System**:
- Primary color: #00d4ff (cyan)
- Background: Dark gradients
- Accent colors: Purple, yellow, green
- Border radius: 8-12px
- Box shadows for depth

---

### 2. `css/game-page.css` - Game Page Styles
**Purpose**: Specific styles for game.html.

**Contains**:
- Canvas container and positioning
- Stats panel styling
- Game over overlay
- Pause menu styles
- Score displays
- Button hover effects

**Key Components**:
- Fixed stats panel (top-right)
- Centered canvas
- Modal overlays
- Animated game over screen

---

### 3. `css/index.css` - Landing Page Styles
**Purpose**: Home page specific styles.

**Contains**:
- Hero section layout
- "Play Now" button animation
- Feature cards
- Gradient backgrounds
- Welcome message styling

---

### 4. `css/login-page.css` & `register-page.css`
**Purpose**: Authentication page styles.

**Contains**:
- Form layouts
- Input field styling
- Submit button styles
- Error message displays
- Link styling
- Form validation feedback

---

### 5. `css/rankings-page.css` - Leaderboard Styles
**Purpose**: Rankings table styling.

**Contains**:
- Table layout and styling
- Ranking badges (gold, silver, bronze)
- Row hover effects
- Current user highlight
- Responsive table design
- Trophy icons

---

## External Libraries

### 1. `libs/gl-matrix.js`
**Purpose**: 3D math library for WebGL.

**Provides**:
- `mat4`: 4x4 matrix operations
  - `create()`: Creates identity matrix
  - `perspective()`: Creates perspective projection
  - `translate()`: Translation transformation
  - `rotate()`: Rotation transformation
  - `invert()`: Matrix inversion
  - `transpose()`: Matrix transposition

- `vec3`: 3D vector operations
  - `create()`, `set()`, `add()`, `subtract()`
  - `normalize()`: Unit vector
  - `cross()`: Cross product
  - `dot()`: Dot product

**Usage in Game**:
- Projection matrix calculations
- Camera view matrix
- Object transformations
- Normal matrix for lighting

**Why Needed**: WebGL requires matrix math for all 3D transformations. Writing this from scratch would be thousands of lines of complex code.

---

### 2. `libs/jquery-3.3.1.min.js`
**Purpose**: JavaScript utility library.

**Used For**:
- Event handling: `$(document).keydown()`
- DOM manipulation: `$('#element')`
- AJAX requests (if needed)
- Cross-browser compatibility

**Usage in Game**:
- Keyboard event listeners in input-handler.js
- UI updates in game.html
- Form handling in auth pages

**Size**: ~87KB minified

**Alternative**: Could be replaced with vanilla JavaScript (`addEventListener`, `querySelector`)

---

### 3. `libs/webgl-utils.js`
**Purpose**: WebGL helper utilities.

**Provides**:
- Shader compilation helpers
- Error checking and logging
- Context initialization helpers
- Common WebGL operations

**Functions**:
- `createShader()`: Compiles shader from source
- `createProgram()`: Links shaders into program
- `resizeCanvasToDisplaySize()`: Canvas sizing
- Error handling wrappers

**Why Needed**: Simplifies WebGL boilerplate code and improves error messages during development.

---

## Assets

### Textures (Images)

1. **`assets/player.png`** - Player character texture
2. **`assets/ground.png`** - Ground/floor texture
3. **`assets/track.jpeg`** - Track lane texture
4. **`assets/wall.jpg`** - Side wall texture
5. **`assets/train.jpg`** - Train obstacle texture
6. **`assets/container.jpg`** - Container obstacle texture
7. **`assets/barrier.jpg`** - Barrier texture
8. **`assets/coin.png`** - Coin collectible texture
9. **`assets/flyboost.jpg`** - Flyboost powerup texture
10. **`assets/finish.jpg`** - Finish line texture

### Audio

**`assets/bgmusic.mp3`** - Background music
- Loops continuously during gameplay
- Volume controlled in game.html
- Starts when game begins

---

## Architecture Overview

### Data Flow

```
User Input (Keyboard)
    ↓
input-handler.js → statusKeys object
    ↓
game-engine.js (main loop)
    ↓
player_tick() → Updates player position
    ↓
*_tick() functions → Update all objects
    ↓
Collision Detection
    ↓
renderer.js → Draws everything
    ↓
Screen Output
```

### Object Creation Flow

```
HTML loads scripts
    ↓
main() initializes WebGL
    ↓
Create shaders and program
    ↓
Generate game objects (player, ground, etc.)
    ↓
initBuffers() for each object
    ↓
Start render loop
```

### Game State Management

**Global Variables** (in game-engine.js):
- `game_start`: Boolean - game has started
- `game_over`: Boolean - player hit obstacle
- `finish`: Boolean - player reached finish line
- `speed`: Current game speed
- Arrays of game objects

**State Transitions**:
1. **Initial**: game_start = false
2. **Playing**: game_start = true, game_over = false
3. **Game Over**: game_over = true
4. **Win**: finish = true

### Rendering Pipeline

```
For each frame:
1. Clear canvas
2. Set projection matrix (3D perspective)
3. For each visible object:
   a. Calculate model-view matrix
   b. Apply transformations
   c. Bind texture
   d. Set shader uniforms
   e. Draw triangles
4. Update UI overlays
5. Request next animation frame
```

### Performance Optimizations

1. **Object Pooling**: Reuse objects instead of creating new ones
2. **Frustum Culling**: Only render objects in view
3. **Texture Caching**: Load textures once
4. **Delta Time**: Frame-rate independent movement
5. **RequestAnimationFrame**: Syncs with display refresh

### Collision Detection

**Method**: Axis-Aligned Bounding Box (AABB)

**Check**:
```javascript
if (player.x == object.x && 
    player.z within object.z range &&
    player.y at ground level) {
    // Collision detected
}
```

**Optimization**: Only check objects near player (z > -5 && z < 5)

---

## File Dependencies

### Load Order (Critical)

1. **jQuery** (if used for older code)
2. **gl-matrix** (math library)
3. **webgl-utils** (WebGL helpers)
4. **storage.js** (data functions)
5. **auth.js** (depends on storage)
6. **core-utils.js** (helpers, texture loading)
7. **Game objects** (obstacle, coin, etc.)
8. **environment.js** (ground, walls)
9. **player.js** (player logic)
10. **input-handler.js** (keyboard)
11. **renderer.js** (drawing functions)
12. **game-engine.js** (main loop - must be last)

### Dependency Graph

```
game-engine.js
    ├── renderer.js
    ├── core-utils.js (camera, textures)
    ├── player.js
    ├── game-objects.js
    ├── environment.js
    ├── finishline.js
    ├── input-handler.js
    ├── storage.js
    ├── auth.js
    └── External libs (gl-matrix, webgl-utils)
```

---

## Summary Statistics

**Total Files**: 25
- HTML: 5
- JavaScript (custom): 10
- JavaScript (libraries): 3
- CSS: 5
- Images: 10
- Audio: 1
- Documentation: 1 (README.md)

**Lines of Code** (approximate):
- JavaScript (custom): ~3,500 lines
- JavaScript (libraries): ~15,000 lines
- CSS: ~1,200 lines
- HTML: ~800 lines

**Total Project Size**: ~2.5 MB
- Code: ~500 KB
- Libraries: ~400 KB
- Assets: ~1.6 MB

---

## Development Notes

### Browser Compatibility
- **Best**: Firefox (tested and recommended)
- **Chrome**: May have CORS issues with local files
- **Edge/Safari**: Should work but not extensively tested

### Known Limitations
1. CORS restrictions for local file:// protocol
2. No server-side validation (client-side only)
3. LocalStorage limited to 5-10MB
4. No actual multiplayer (leaderboard is local only)

### Future Improvements
1. Replace jQuery with vanilla JavaScript
2. Add more obstacle types
3. Implement difficulty levels
4. Add sound effects for actions
5. Mobile touch controls
6. Server-side leaderboard
7. Particle effects
8. More power-ups

---

*Document Generated: October 27, 2025*
*Project: Train Run - WebGL Endless Runner*
*Version: 1.0*
