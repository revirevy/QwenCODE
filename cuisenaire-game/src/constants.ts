// Cuisenaire Rod Colors - Strict standard color/length pairing
export const ROD_COLORS: Record<number, string> = {
  1: '#e8e2c5', // White/Beige
  2: '#d63d3d', // Red
  3: '#8ecca3', // Light Green
  4: '#a37bc4', // Purple
  5: '#f5d742', // Yellow
  6: '#3b8c55', // Dark Green
  7: '#2b2b2b', // Black
  8: '#7a4f36', // Brown
  9: '#4a80c9', // Blue
  10: '#e08831', // Orange
};

// Default game settings
export const DEFAULT_TARGET_WIDTH = 10;
export const MIN_TARGET_WIDTH = 5;
export const MAX_TARGET_WIDTH = 20;

// Game UI dimensions
export const ROD_HEIGHT = 40; // pixels
export const ROD_MIN_WIDTH = 30; // pixels per unit