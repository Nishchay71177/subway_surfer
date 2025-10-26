# Subway Surfers - WebGL Game Website
## CST2120 Coursework 1 - Game Website (2025-26)

### Project Overview
This is a fully functional endless runner game website built entirely with **HTML5, CSS3, and JavaScript**. The game features user registration, authentication, score tracking, and a competitive rankings system - all implemented using client-side technologies and local storage.

---

## Features Implementation

### 1. **Game Page** (`game.html`)
- **3D WebGL Graphics**: Full 3D endless runner game using WebGL
- **Gameplay**: Run through subway tracks, avoid obstacles, collect coins
- **Controls**: Arrow keys / WASD for movement, Space for jump
- **Score System**: Real-time score tracking with coins and distance
- **Power-ups**: Fly boost and jump boost collectibles
- **Game States**: Start screen, pause menu, game over screen
- **Audio**: Background music with volume control

### 2. **Registration System** (`register.html`)
- **Form Fields**: 
  - Full Name
  - Email Address
  - Address
  - Phone Number
  - Password (with confirmation)
- **JavaScript Validation** (No HTML5 validation):
  - Name: Minimum 2 characters, letters and spaces only
  - Email: Valid email format using regex
  - Address: Minimum 5 characters
  - Phone: At least 10 digits, accepts various formats
  - Password: Minimum 6 characters with uppercase, lowercase, and number
- **Real-time Feedback**: Validation errors shown without alerts
- **Data Storage**: User data saved to localStorage in JSON format
- **Duplicate Check**: Prevents registration with existing email

### 3. **Login System** (`login.html`)
- **Credential Verification**: Checks email and password against localStorage
- **Error Handling**: Specific error messages for:
  - Missing email or password
  - Email not found
  - Incorrect password
- **No JavaScript Alerts**: All errors displayed in styled message boxes
- **Return URL Support**: Redirects back to previous page after login
- **Session Management**: Maintains logged-in state across pages

### 4. **Rankings/Leaderboard** (`rankings.html`)
- **Top Players Display**: Shows top 20 players sorted by high score
- **Data Visualization**:
  - Rank position (with medals for top 3: 🥇🥈🥉)
  - Player name
  - High score
  - Total coins collected
  - Games played
- **Current User Highlighting**: Logged-in user's row highlighted in green
- **User Rank Display**: Shows current user's position and stats
- **Dynamic Updates**: Rankings update automatically from localStorage

### 5. **Navigation System**
- **Consistent Navigation Bar**: Present on all pages
  - Home (🏠)
  - Play Game (🎮)
  - Register (📝)
  - Login (🔐)
  - Rankings (🏆)
  - Instructions (📖)
- **Active Page Indicator**: Current page highlighted in nav
- **No Back Button Reliance**: Users can navigate anywhere from any page
- **Responsive Design**: Navigation adapts to mobile screens

### 6. **Home Page** (`index.html`)
- **Game Overview**: Welcome screen with game description
- **Quick Access Buttons**: Direct links to play or view instructions
- **Statistics Dashboard**: 
  - High Score
  - Total Coins
  - Games Played
  - Total Distance
- **User-Specific Stats**: Shows logged-in user's personal stats
- **Feature Showcase**: Grid of game features with icons and descriptions
- **User Status**: Displays welcome message for logged-in users or login prompt

### 7. **Instructions Page** (`instructions.html`)
- **Game Controls**: Visual guide to keyboard controls
- **Game Objective**: Clear explanation of gameplay
- **Features List**: Detailed list of game features
- **Power-ups Guide**: Explanation of boost items
- **Tips Section**: Strategy tips for better gameplay

---

## Technical Implementation

### **Data Storage (JSON in localStorage)**

#### User Data Structure:
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  address: "123 Main St",
  phone: "1234567890",
  password: "Password123",
  registeredDate: "2025-10-23T12:00:00.000Z",
  highScore: 150,
  totalCoins: 450,
  gamesPlayed: 12,
  totalDistance: 3200
}
```

#### localStorage Keys:
- `subway_users`: Array of all registered users
- `subway_current_user`: Email of currently logged-in user
- `subway_highScore`: High score for non-logged-in users
- `subway_gamesPlayed`: Games played counter
- `subway_totalCoins`: Total coins collected
- `subway_totalDistance`: Total distance traveled

### **Modular Code Structure**

#### JavaScript Modules:
1. **`auth.js`** - Authentication Manager
   - User registration
   - Login/logout functionality
   - Session management
   - Score tracking per user
   - Rankings generation

2. **`storage.js`** - Storage Manager
   - localStorage operations
   - Statistics tracking
   - Data persistence

3. **`player.js`** - Player Class
   - Player movement and controls
   - Collision detection
   - Animation

4. **`obstacle.js`**, **`barrier.js`**, **`coin.js`** - Game Object Classes
   - Object rendering
   - Position management
   - Collision detection

5. **`draw.js`** - Rendering Engine
   - WebGL rendering
   - Camera management
   - Scene composition

6. **`main.js`** - Game Loop
   - Game state management
   - Update cycle
   - Event handling

### **Form Validation (JavaScript-Based)**

All validation is performed using JavaScript functions, not HTML5 attributes:

```javascript
// Email validation example
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}
```

### **No Alerts Policy**

Instead of `alert()`, the website uses:
- Styled error message divs with animations
- Color-coded feedback (red for errors, green for success)
- Real-time validation with immediate visual feedback
- Modal dialogs for game states

---

## Page Descriptions & Screenshots

### 1. **Home Page** (`index.html`)
- **Purpose**: Landing page with game overview
- **Elements**: 
  - Large hero section with game title
  - Statistics cards showing player performance
  - Feature grid highlighting game capabilities
  - Call-to-action buttons
  - User login status

### 2. **Game Page** (`game.html`)
- **Purpose**: Main gameplay interface
- **Elements**:
  - Full-screen WebGL canvas
  - Stats panel (high score, games played, coins)
  - Game legend/guide
  - Control panel (pause, volume)
  - Pause menu
  - Game over screen with stats

### 3. **Registration Page** (`register.html`)
- **Purpose**: New user account creation
- **Elements**:
  - Multi-field registration form
  - Real-time validation indicators
  - Success/error messaging
  - Link to login page

### 4. **Login Page** (`login.html`)
- **Purpose**: User authentication
- **Elements**:
  - Email and password fields
  - Error message display
  - Link to registration page
  - Auto-redirect on success

### 5. **Rankings Page** (`rankings.html`)
- **Purpose**: Leaderboard display
- **Elements**:
  - User info section (if logged in)
  - Sortable rankings table
  - Medal icons for top 3
  - Current user highlighting
  - Logout button

### 6. **Instructions Page** (`instructions.html`)
- **Purpose**: Game tutorial and help
- **Elements**:
  - Control scheme diagram
  - Game objectives
  - Feature descriptions
  - Strategy tips

---

## How to Run

1. **Start Local Server** (Required for texture loading):
   ```bash
   python -m http.server 8000
   ```

2. **Open in Browser**:
   - Navigate to: `http://localhost:8000`
   - Or use VS Code Live Server extension

3. **Create an Account**:
   - Click "Register" in navigation
   - Fill out registration form
   - Login with credentials

4. **Play the Game**:
   - Click "Play Game" from any page
   - Use arrow keys or WASD to move
   - Space to jump
   - Avoid obstacles, collect coins

5. **View Rankings**:
   - Check leaderboard to see your rank
   - Compare scores with other players

---

## Technologies Used

- **HTML5**: Semantic markup, Canvas element
- **CSS3**: Flexbox, Grid, Animations, Gradients, Backdrop filters
- **JavaScript (ES6+)**: 
  - Classes and modules
  - localStorage API
  - Array methods (map, filter, sort)
  - Regular expressions for validation
  - Event listeners
- **WebGL**: 3D graphics rendering
- **JSON**: Data serialization and storage
- **gl-matrix.js**: Matrix operations for 3D rendering
- **jQuery**: DOM manipulation (minimal usage)

---

## Compliance with Requirements

✅ **Game built with HTML, CSS, JavaScript only** - No server-side code  
✅ **Score generation and storage** - Scores saved to localStorage in JSON  
✅ **Graphical elements** - Full 3D WebGL graphics  
✅ **Modular code structure** - Classes and separate modules  
✅ **User registration with validation** - JavaScript-based validation  
✅ **Login system with error handling** - No alerts, styled error messages  
✅ **Rankings page** - Sorted leaderboard from localStorage  
✅ **Navigation bar on all pages** - Consistent navigation without back buttons  
✅ **Local storage (JSON)** - All data stored in localStorage  
✅ **No JavaScript alerts** - Custom UI elements for user feedback  
✅ **Original game** - Custom implementation, not copied  

---

## Game Mechanics

### Scoring System
- **Base Score**: Increases with distance traveled
- **Coins**: +10 points per coin collected
- **Distance Multiplier**: Score increases faster over time
- **High Score**: Best score saved and displayed

### Obstacles
- **Barriers**: Small red obstacles on tracks
- **Trains**: Large moving obstacles
- **Containers**: Static obstacles to avoid

### Power-ups
- **Fly Boost**: Allows temporary flight over obstacles
- **Jump Boost**: Enhanced jumping ability

### Difficulty Progression
- Speed increases gradually
- More obstacles spawn over time
- Obstacle patterns become more complex

---

## Code Quality

- **Commented Code**: All functions documented with purpose
- **Error Handling**: Graceful error handling throughout
- **Responsive Design**: Works on various screen sizes
- **Clean Code**: Follows best practices and conventions
- **Separation of Concerns**: Game logic, UI, and data management separated

---

## Future Enhancements (Not Required)

- Multiple character selection
- Different track themes
- Online multiplayer
- Social media integration
- Achievement system
- Daily challenges

---

## Author
**Student Name**: [Your Name]  
**Course**: CST2120 - Client-Side Web Technologies  
**Year**: 2025-26  
**Assignment**: Coursework 1 - Game Website

---

## License
This project is submitted as coursework for educational purposes.
