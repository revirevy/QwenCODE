import React, { useState } from 'react';
import { useCuisenaire, Rod as RodType } from './useCuisenaire';
import Rod from './Rod';
import SettingsModal from './SettingsModal';
import { DEFAULT_TARGET_WIDTH } from './constants';

const Board: React.FC = () => {
  const {
    gameState,
    startGame,
    placeRod,
    discardRod,
    resetGame,
    changeTargetWidth,
  } = useCuisenaire();

  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleStartNewGame = () => {
    startGame(gameState.targetWidth);
  };

  const handlePlaceRod = () => {
    if (gameState.availableRod) {
      placeRod(gameState.availableRod);
    }
  };

  const handleDiscardRod = () => {
    discardRod();
  };

  const handleSaveSettings = (newTargetWidth: number) => {
    changeTargetWidth(newTargetWidth);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Instructions Panel */}
      {showInstructions && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl w-full">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Cuisenaire Rod Puzzle</h1>
              <p className="text-gray-600 mb-3">
                Fill the row with rods to exactly match the target sum. Only the bottom row can be filled!
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Click "Place Rod" to add the current rod to the row</li>
                <li>If a rod doesn't fit, click "Discard" to get a new one</li>
                <li>Complete the row by making the sum equal to the target</li>
                <li>Faster completion and fewer discards give better scores</li>
              </ul>
            </div>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Game Controls */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-lg font-semibold">
              Target: <span className="text-blue-600">{gameState.targetWidth}</span>
            </div>
            <div className="text-lg font-semibold">
              Current: <span className="text-green-600">{gameState.currentSum}</span>
            </div>
            <div className="text-lg font-semibold">
              Trials: <span className="text-red-600">{gameState.trials}</span>
            </div>
            <div className="text-lg font-semibold">
              Time: <span className="text-purple-600">{formatTime(gameState.timeElapsed)}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            {!gameState.gameActive && !gameState.isRowComplete && (
              <button
                onClick={handleStartNewGame}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Start Game
              </button>
            )}
            
            {gameState.isRowComplete && (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md font-semibold">
                Row Complete! +{Math.floor((gameState.targetWidth * 10) / (gameState.timeElapsed || 1) * (10 / (gameState.trials + 1)))} pts
              </div>
            )}
            
            <button
              onClick={() => setShowSettings(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Settings
            </button>
            
            {(gameState.gameActive || gameState.isRowComplete) && (
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-4">
        {/* Current Row Display */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Current Row</h2>
          <div 
            className="flex items-center border-2 border-dashed border-gray-400 rounded-lg p-2 min-h-[60px] bg-gray-50"
            style={{ width: '100%', maxWidth: `${gameState.targetWidth * 30}px` }}
          >
            {gameState.currentRow.length > 0 ? (
              <div className="flex">
                {gameState.currentRow.map((rod) => (
                  <Rod
                    key={rod.id}
                    length={rod.length}
                    color={rod.color}
                    height={40}
                    widthPerUnit={30}
                    disabled={true}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full text-center text-gray-500 italic">
                Fill this row with rods to match the target sum
              </div>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Progress: {gameState.currentSum}/{gameState.targetWidth}
          </div>
        </div>

        {/* Available Rod */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Available Rod</h2>
          <div className="flex items-center justify-center min-h-[60px] bg-gray-50 rounded-lg p-4">
            {gameState.availableRod ? (
              <div className="flex flex-col items-center">
                <Rod
                  length={gameState.availableRod.length}
                  color={gameState.availableRod.color}
                  height={40}
                  widthPerUnit={30}
                  disabled={true}
                />
                <div className="mt-2 text-sm text-gray-600">
                  Length: {gameState.availableRod.length}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 italic">
                {gameState.isRowComplete 
                  ? "Row completed! Start a new game." 
                  : "Starting new game..."}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePlaceRod}
            disabled={!gameState.gameActive || !gameState.availableRod || gameState.isRowComplete}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              !gameState.gameActive || !gameState.availableRod || gameState.isRowComplete
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            Place Rod
          </button>
          
          <button
            onClick={handleDiscardRod}
            disabled={!gameState.gameActive || !gameState.availableRod || gameState.isRowComplete}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              !gameState.gameActive || !gameState.availableRod || gameState.isRowComplete
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            } transition-colors`}
          >
            Discard & Get New
          </button>
        </div>
      </div>

      {/* Game Status Message */}
      {gameState.gameActive && gameState.availableRod && (
        <div className="text-center mb-4">
          {gameState.currentSum + gameState.availableRod.length > gameState.targetWidth ? (
            <p className="text-red-600 font-semibold">
              Warning: This rod would exceed the target! Consider discarding.
            </p>
          ) : (
            <p className="text-green-600 font-semibold">
              This rod will fit in the current row.
            </p>
          )}
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentTargetWidth={gameState.targetWidth}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default Board;