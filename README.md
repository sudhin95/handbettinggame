# Mahjong Hand Betting Game 🎴

## 📌 Overview
This is a browser-based Mahjong-inspired hand betting game built using Angular.  
Players bet whether the next hand will have a higher or lower value compared to the current hand.

## ⚙️ Setup Instructions

### 1. Clone the Repository
Git Repository URL = https://github.com/sudhin95/handbettinggame.git

git clone https://github.com/sudhin95/handbettinggame.git

cd handbettinggame

### 2. Install Dependencies
npm install

### 3. Run the Application
ng serve

Open in browser:
http://localhost:4200


## 🎮 Game Rules
Each round:
- The player is dealt 3 tiles (current hand)
- A next hand is pre-drawn (hidden initially)
- The player places a bet:
    HIGHER → next hand value will be higher than the current hand
    LOWER → next hand value will be lower than the current hand
- Tile Types
    Number tiles (1–9) → fixed values
    Wind tiles (East, South, West, North) → dynamic values
    Dragon tiles (Red, Green, White) → dynamic values


## 🎮 How to Play
- The player starts with 1000 points
- Each round, you are dealt 3 tiles (current hand)
- Choose a bet:
    HIGHER or LOWER
- Enter the bet amount manually
- The next hand is revealed and the result is calculated:
    If you win, your score increases by the bet amount
    If you lose, your score decreases by the bet amount
- Special Tile Behavior
    After each round:
    Winning increases special tile values by +1
    Losing decreases special tile values by -1
- These updated values are used in future rounds, adding a strategic element to the game

## 🔄 Special Tile Logic
- Special tiles start at value 5
- Win → +1
- Loss → -1
- Range: 0 to 10

## 🛑 Game Over Conditions
- Tile reaches 0 or 10
- Score becomes 0
- Max reshuffle limit reached (Max ressuffle upto 3 times)

## 📊 Features
- Betting system
- Dynamic tile values
- Hand history (last 5)
- Leaderboard (LocalStorage)

## 🧠 Technical Approach
- Angular + TypeScript
- LocalStorage for persistence

## ✍️ Handwritten vs AI
Handwritten:
- Core game logic (betting system, scoring, win/loss calculation)
- Tile system implementation (deck generation, draw/discard, reshuffling)
- Dynamic tile value logic for winds and dragons
- State management within the Angular component
- Game flow handling (rounds, game over conditions, history tracking)
- Debugging and fixing logic issues

AI:
- Explanations
- Debugging and fixing logic issues
- Code structuring and organization suggestions
- Performance and logic optimizations
- Minor refactoring for readability and maintainability

## 👤 Author
Sudhin S
