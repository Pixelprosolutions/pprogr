import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCw, ArrowDown, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: number[][];
  color: string;
  position: Position;
}

const TetrisPage: React.FC = () => {
  const navigate = useNavigate();
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
    if (!gameOver && !isPaused) {
      gameLoopRef.current = setInterval(() => {
        movePiece('down');
      }, dropTime);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [movePiece, dropTime, gameOver, isPaused]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [movePiece, handleRotate, hardDrop]);

  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

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
            className="w-6 h-6 border border-white/5"
            style={{
              backgroundColor: cell || 'transparent',
              boxShadow: cell ? '0 0 8px rgba(255, 255, 255, 0.3), inset 0 0 4px rgba(255, 255, 255, 0.1)' : 'none',
              border: cell ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
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
            className="w-4 h-4 border border-white/10"
            style={{
              backgroundColor: cell ? nextPiece.color : 'transparent',
              boxShadow: cell ? '0 0 6px rgba(255, 255, 255, 0.3), inset 0 0 2px rgba(255, 255, 255, 0.1)' : 'none',
              border: cell ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="container mx-auto px-4">
        {/* Home Button - Fixed position */}
        <button
          onClick={() => navigate('/')}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center"
        >
          <Home className="w-4 h-4 mr-2" />
          Επιστροφή στην Αρχική
        </button>

        <div className="max-w-7xl mx-auto w-full">
          <div className="flex gap-4 items-start">
            {/* Game Board */}
            <div className="flex-1 flex justify-center">
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-8 relative">
                {gameOver && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-4">Game Over!</h3>
                      <p className="text-gray-300 mb-6">Final Score: {score}</p>
                      <button
                        onClick={initGame}
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-6 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        Παίξε Ξανά
                      </button>
                    </div>
                  </div>
                )}
                
                {isPaused && !gameOver && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-4">Παύση</h3>
                      <p className="text-gray-300">Πάτησε P για να συνεχίσεις</p>
                    </div>
                  </div>
                )}
                
                <div className="game-board" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}>
                <div className="game-board">
                  <div className="border-2 border-white/20 rounded-lg p-2 bg-black/30">
                    {renderBoard()}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="w-64 space-y-4 hidden lg:block">
              {/* Score */}
              <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <h3 className="text-lg font-bold text-white mb-2">Σκορ</h3>
                <p className="text-2xl font-bold text-white mb-2">{score}</p>
                <div className="space-y-1 text-gray-300 text-sm">
                  <p>Επίπεδο: {level}</p>
                  <p>Γραμμές: {lines}</p>
                </div>
              </div>

              {/* Next Piece */}
              <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <h3 className="text-lg font-bold text-white mb-2">Επόμενο</h3>
                <div className="flex justify-center">
                  <div className="space-y-1">
                    {renderNextPiece()}
                  </div>
                </div>
              </div>

              {/* Controls - Hidden on mobile, shown on desktop */}
              <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <h3 className="text-lg font-bold text-white mb-2">Χειριστήρια</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p className="flex items-center">
                    <ArrowLeft className="inline w-3 h-3 mr-1" />
                    <ArrowRight className="inline w-3 h-3 mr-1" />
                    Κίνηση
                  </p>
                  <p className="flex items-center">
                    <ArrowDown className="inline w-3 h-3 mr-1" />
                    Γρήγορη Πτώση
                  </p>
                  <p className="flex items-center">
                    <RotateCw className="inline w-3 h-3 mr-1" />
                    Περιστροφή (↑ ή Space)
                  </p>
                  <p>Enter: Άμεση Πτώση</p>
                  <p>P: Παύση</p>
                </div>
              </div>

              {/* Game Controls */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  disabled={gameOver}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50 text-sm"
                >
                  {isPaused ? 'Συνέχεια' : 'Παύση'}
                </button>
                <button
                  onClick={initGame}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-colors text-sm"
                >
                  Νέο Παιχνίδι
                </button>
              </div>
            </div>

            {/* Mobile Controls - Only show on mobile */}
            <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <button
                  onClick={() => movePiece('left')}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mx-auto" />
                </button>
                <button
                  onClick={handleRotate}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <RotateCw className="h-4 w-4 mx-auto" />
                </button>
                <button
                  onClick={() => movePiece('right')}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <ArrowRight className="h-4 w-4 mx-auto" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => movePiece('down')}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <ArrowDown className="h-4 w-4 mx-auto" />
                </button>
                <button
                  onClick={hardDrop}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-3 rounded-lg hover:bg-white/30 transition-colors text-xs"
                >
                  DROP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TetrisPage;