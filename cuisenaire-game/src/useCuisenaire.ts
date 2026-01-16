import { useState, useEffect, useCallback } from 'react';
import { ROD_COLORS, DEFAULT_TARGET_WIDTH } from './constants';

export interface Rod {
  id: string;
  length: number;
  color: string;
}

export interface GameState {
  targetWidth: number;
  currentRow: Rod[];
  currentSum: number;
  availableRod: Rod | null;
  trials: number;
  timeElapsed: number;
  isRowComplete: boolean;
  gameActive: boolean;
}

const generateRandomRod = (): Rod => {
  const length = Math.floor(Math.random() * 10) + 1; // Random length from 1 to 10
  return {
    id: `rod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    length,
    color: ROD_COLORS[length],
  };
};

export const useCuisenaire = () => {
  const [gameState, setGameState] = useState<GameState>({
    targetWidth: DEFAULT_TARGET_WIDTH,
    currentRow: [],
    currentSum: 0,
    availableRod: null,
    trials: 0,
    timeElapsed: 0,
    isRowComplete: false,
    gameActive: false,
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.gameActive && !gameState.isRowComplete) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.gameActive, gameState.isRowComplete]);

  // Generate initial rod when game starts
  useEffect(() => {
    if (gameState.gameActive && !gameState.availableRod) {
      setGameState(prev => ({
        ...prev,
        availableRod: generateRandomRod()
      }));
    }
  }, [gameState.gameActive, gameState.availableRod]);

  const startGame = useCallback((targetWidth: number = DEFAULT_TARGET_WIDTH) => {
    setGameState({
      targetWidth,
      currentRow: [],
      currentSum: 0,
      availableRod: null,
      trials: 0,
      timeElapsed: 0,
      isRowComplete: false,
      gameActive: true,
    });
  }, []);

  const placeRod = useCallback((rod: Rod) => {
    if (!gameState.gameActive || gameState.isRowComplete || !rod) return;
    
    // Check if rod fits in current row
    const newSum = gameState.currentSum + rod.length;
    if (newSum > gameState.targetWidth) {
      // Rod doesn't fit, increase trial count
      setGameState(prev => ({
        ...prev,
        trials: prev.trials + 1,
        availableRod: generateRandomRod(),
      }));
      return;
    }

    // Place the rod
    const newRow = [...gameState.currentRow, rod];
    const newCurrentSum = newSum;
    
    // Check if row is complete
    const isRowComplete = newCurrentSum === gameState.targetWidth;
    
    setGameState(prev => ({
      ...prev,
      currentRow: newRow,
      currentSum: newCurrentSum,
      availableRod: isRowComplete ? null : generateRandomRod(), // Generate new rod if not complete
      isRowComplete,
      gameActive: !isRowComplete, // Stop game if row is complete
    }));
  }, [gameState]);

  const discardRod = useCallback(() => {
    if (!gameState.gameActive || gameState.isRowComplete || !gameState.availableRod) return;
    
    setGameState(prev => ({
      ...prev,
      trials: prev.trials + 1,
      availableRod: generateRandomRod(),
    }));
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentRow: [],
      currentSum: 0,
      availableRod: null,
      trials: 0,
      timeElapsed: 0,
      isRowComplete: false,
      gameActive: true,
    }));
  }, []);

  const changeTargetWidth = useCallback((newWidth: number) => {
    if (newWidth >= 5 && newWidth <= 20) {
      setGameState(prev => ({
        ...prev,
        targetWidth: newWidth,
      }));
    }
  }, []);

  return {
    gameState,
    startGame,
    placeRod,
    discardRod,
    resetGame,
    changeTargetWidth,
  };
};