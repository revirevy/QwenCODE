# Cuisenaire Rod Math Puzzle Game

An interactive educational game for learning addition using Cuisenaire rods. Players must fill rows with rods to exactly match a target sum.

## Features

- ✅ Authentic Cuisenaire rod colors (following standard color/length pairings)
- ✅ Dynamic target width selection (5-20 units)
- ✅ Real-time scoring based on speed and efficiency
- ✅ Responsive design for web and mobile
- ✅ Intuitive drag-and-drop style gameplay
- ✅ Discard mechanic for rods that don't fit
- ✅ Visual feedback and instructions

## Game Rules

1. **Fill the Bottom Row**: Only the bottom row can be filled at any time
2. **Exact Match**: Complete the row by making the sum exactly equal to the target
3. **Strategic Discard**: If a rod doesn't fit, discard it to get a new one (increases trial count)
4. **Score Calculation**: Faster completion and fewer discards yield higher scores

## Technical Implementation

- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS + inline styles for rod colors
- **State Management**: Custom React hooks
- **Responsive Design**: Works on all device sizes (80% of viewport)

## Files Structure

- `src/constants.ts`: Cuisenaire rod colors and game settings
- `src/useCuisenaire.ts`: Core game logic hook
- `src/Board.tsx`: Main game board component
- `src/Rod.tsx`: Reusable rod component
- `src/SettingsModal.tsx`: Settings modal component

## Installation & Setup

To run this project, install it as a dependency:

```bash
cd cuisenaire-game
npm install
npm run dev
```

Note: If you encounter memory issues during installation, you may need to increase available memory or install dependencies individually.

## How to Play

1. Click "Start Game" to begin
2. Use "Place Rod" to add the current rod to the row
3. If a rod doesn't fit, use "Discard & Get New" to try another
4. Complete the row by matching the exact target sum
5. Adjust target width via Settings for different difficulty levels

## Scoring

Points are calculated based on:
- **Time**: Faster completion gives more points
- **Trials**: Fewer discards give more points
