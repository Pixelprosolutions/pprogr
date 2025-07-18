import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

// Game constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_DROP_TIME = 1000;

// Tetris pieces (tetrominoes)
const PIECES = {
  I: {
    shape: [
      [1, 1, 1, 1]
    ],
    color: 'rgba(255, 255, 255, 0.8)'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'rgba(255, 255, 255, 0.7)'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'rgba(255, 255, 255, 0.6)'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'rgba(255, 255, 255, 0.5)'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'rgba(255, 255, 255, 0.4)'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'rgba(255, 255, 255, 0.3)'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'rgba(255, 255, 255, 0.2)'
  }
};

interface TetrisGameProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: number[][];
  color: string;
  position: Position;
}

const TetrisGame: React.FC<TetrisGameProps> = ({ isOpen, onClose }) => {
  const [board, setBoard] = useState<(string | null)[][]>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Create a random piece
  const createPiece = useCallback((): Piece => {
    const pieceTypes = Object.keys(PIECES);
    const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)] as keyof typeof PIECES;
    const piece = PIECES[randomType];
    
    return {
      shape: piece.shape,
      color: piece.color,
      position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2), y: 0 }
    };
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    const newBoard = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
    setBoard(newBoard);
    setCurrentPiece(createPiece());
    setNextPiece(createPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setDropTime(INITIAL_DROP_TIME);
  }, [createPiece]);

  // Check if position is valid
  const isValidPosition = useCallback((piece: Piece, newPosition: Position): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = newPosition.x + x;
          const newY = newPosition.y + y;
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (newY >= 0 && board[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  // Rotate piece
  const rotatePiece = useCallback((piece: Piece): number[][] => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    return rotated;
  }, []);

  // Place piece on board
  const placePiece = useCallback((piece: Piece, newBoard: (string | null)[][]) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.position.y + y;
          const boardX = piece.position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      }
    }
  }, []);

  // Clear completed lines
  const clearLines = useCallback((newBoard: (string | null)[][]) => {
    let linesCleared = 0;
    
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== null)) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(null));
        linesCleared++;
        y++; // Check the same line again
      }
    }
    
    return linesCleared;
  }, []);

  // Move piece
  const movePiece = useCallback((direction: 'left' | 'right' | 'down') => {
    if (!currentPiece || gameOver || isPaused) return;

    const newPosition = { ...currentPiece.position };
    
    switch (direction) {
      case 'left':
        newPosition.x--;
        break;
      case 'right':
        newPosition.x++;
        break;
      case 'down':
        newPosition.y++;
        break;
    }

    const newPiece = { ...currentPiece, position: newPosition };
    
    if (isValidPosition(newPiece, newPosition)) {
      setCurrentPiece(newPiece);
    } else if (direction === 'down') {
      // Piece has landed
      const newBoard = board.map(row => [...row]);
      placePiece(currentPiece, newBoard);
      
      const linesCleared = clearLines(newBoard);
      
      if (linesCleared > 0) {
        setLines(prev => prev + linesCleared);
        setScore(prev => prev + linesCleared * 100 * level);
        setLevel(Math.floor((lines + linesCleared) / 10) + 1);
        setDropTime(Math.max(100, INITIAL_DROP_TIME - (level - 1) * 100));
      }
      
      setBoard(newBoard);
      setCurrentPiece(nextPiece);
      setNextPiece(createPiece());
      
      // Check game over
      if (nextPiece && !isValidPosition(nextPiece, nextPiece.position)) {
        setGameOver(true);
      }
    }
  }, [currentPiece, nextPiece, board, gameOver, isPaused, isValidPosition, placePiece, clearLines, level, lines, createPiece]);

  // Rotate current piece
  const handleRotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotatedShape = rotatePiece(currentPiece);
    const rotatedPiece = { ...currentPiece, shape: rotatedShape };
    
    if (isValidPosition(rotatedPiece, currentPiece.position)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, gameOver, isPaused, rotatePiece, isValidPosition]);

  // Hard drop
  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = currentPiece.position.y;
    while (isValidPosition(currentPiece, { ...currentPiece.position, y: newY + 1 })) {
      newY++;
    }
    
    const droppedPiece = { ...currentPiece, position: { ...currentPiece.position, y: newY } };
    setCurrentPiece(droppedPiece);
    
    // Trigger landing
    setTimeout(() => movePiece('down'), 50);
  }, [currentPiece, gameOver, isPaused, isValidPosition, movePiece]);

  // Game loop
  useEffect(() => {
    if (!gameOver && !isPaused && isOpen) {
      gameLoopRef.current = setInterval(() => {
        movePiece('down');
      }, dropTime);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [movePiece, dropTime, gameOver, isPaused, isOpen]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece('right');
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece('down');
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          handleRotate();
          break;
        case 'Enter':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, movePiece, handleRotate, hardDrop, onClose]);

  // Initialize game when opened
  useEffect(() => {
    if (isOpen) {
      initGame();
    }
  }, [isOpen, initGame]);

  // Render board with current piece
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display board
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }
    
    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className="w-6 h-6 border border-white/10"
            style={{
              backgroundColor: cell || 'transparent',
              boxShadow: cell ? '0 0 10px rgba(255, 255, 255, 0.2)' : 'none'
            }}
          />
        ))}
      </div>
    ));
  };

  // Render next piece preview
  const renderNextPiece = () => {
    if (!nextPiece) return null;
    
    return nextPiece.shape.map((row, y) => (
      <div key={y} className="flex justify-center">
        {row.map((cell, x) => (
          <div
            key={x}
            className="w-4 h-4 border border-white/5"
            style={{
              backgroundColor: cell ? nextPiece.color : 'transparent',
              boxShadow: cell ? '0 0 8px rgba(255, 255, 255, 0.2)' : 'none'
            }}
          />
        ))}
      </div>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Tetris - Σπατάλησε το Χρόνο Σου!</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-4 inline-block">
              {gameOver && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Game Over!</h3>
                    <p className="text-gray-300 mb-4">Score: {score}</p>
                    <button
                      onClick={initGame}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      Play Again
                    </button>
                  </div>
                </div>
              )}
              
              {isPaused && !gameOver && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Paused</h3>
                    <p className="text-gray-300">Press P to continue</p>
                  </div>
                </div>
              )}
              
              <div className="relative">
                {renderBoard()}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-2">Score</h3>
              <p className="text-2xl font-bold text-white">{score}</p>
              <div className="mt-2 text-sm text-gray-300">
                <p>Level: {level}</p>
                <p>Lines: {lines}</p>
              </div>
            </div>

            {/* Next Piece */}
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-2">Next</h3>
              <div className="flex justify-center">
                <div className="space-y-1">
                  {renderNextPiece()}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-3">Controls</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><ArrowLeft className="inline w-4 h-4" /> <ArrowRight className="inline w-4 h-4" /> Move</p>
                <p><ArrowDown className="inline w-4 h-4" /> Soft Drop</p>
                <p><RotateCw className="inline w-4 h-4" /> Rotate (↑ or Space)</p>
                <p>Enter: Hard Drop</p>
                <p>P: Pause</p>
                <p>Esc: Exit</p>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden grid grid-cols-3 gap-2">
              <button
                onClick={() => movePiece('left')}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={handleRotate}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors"
              >
                <RotateCw className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={() => movePiece('right')}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors"
              >
                <ArrowRight className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={() => movePiece('down')}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors col-span-1"
              >
                <ArrowDown className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={hardDrop}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-xs"
              >
                DROP
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-xs"
              >
                {isPaused ? 'PLAY' : 'PAUSE'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;