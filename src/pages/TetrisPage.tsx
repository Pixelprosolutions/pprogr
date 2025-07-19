import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, RotateCw, ArrowDown, ArrowRight, Pause, Play } from 'lucide-react';

// Tetris game constants - optimized for mobile
const BOARD_WIDTH = 8; // Reduced from 10 for mobile
const BOARD_HEIGHT = 16; // Reduced from 20 for mobile
const EMPTY_CELL = 0;

// Tetris pieces (tetrominoes)
const PIECES = [
  // I-piece
  [
    [1, 1, 1, 1]
  ],
  // O-piece
  [
    [1, 1],
    [1, 1]
  ],
  // T-piece
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  // S-piece
  [
    [0, 1, 1],
    [1, 1, 0]
  ],
  // Z-piece
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  // J-piece
  [
    [1, 0, 0],
    [1, 1, 1]
  ],
  // L-piece
  [
    [0, 0, 1],
    [1, 1, 1]
  ]
];

const PIECE_COLORS = [
  'rgba(196, 132, 252, 0.9)', // I-piece - purple-400
  'rgba(244, 63, 94, 0.9)',   // O-piece - brand accent
  'rgba(168, 85, 247, 0.9)',  // T-piece - purple-500
  'rgba(244, 63, 94, 0.9)',   // S-piece - brand accent
  'rgba(147, 51, 234, 0.9)',  // Z-piece - purple-600
  'rgba(244, 63, 94, 0.9)',   // J-piece - brand accent
  'rgba(192, 132, 252, 0.9)'  // L-piece - purple-400
];

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: number[][];
  position: Position;
  type: number;
}

const TetrisPage: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-start
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Create a new random piece
  const createNewPiece = useCallback((): Piece => {
    const pieceType = Math.floor(Math.random() * PIECES.length);
    return {
      shape: PIECES[pieceType],
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
      type: pieceType
    };
  }, []);

  // Check if a piece can be placed at a position
  const canPlacePiece = useCallback((piece: Piece, newPosition: Position, newShape?: number[][]): boolean => {
    const shape = newShape || piece.shape;
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = newPosition.x + x;
          const boardY = newPosition.y + y;
          
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (boardY >= 0 && board[boardY][boardX] !== EMPTY_CELL) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  // Rotate a piece 90 degrees clockwise
  const rotatePiece = useCallback((shape: number[][]): number[][] => {
    const rows = shape.length;
    const cols = shape[0].length;
    const rotated = Array(cols).fill(null).map(() => Array(rows).fill(0));
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        rotated[x][rows - 1 - y] = shape[y][x];
      }
    }
    
    return rotated;
  }, []);

  // Place piece on board
  const placePieceOnBoard = useCallback((piece: Piece): number[][] => {
    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.position.y + y;
          const boardX = piece.position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.type + 1;
          }
        }
      }
    }
    
    return newBoard;
  }, [board]);

  // Clear completed lines
  const clearLines = useCallback((gameBoard: number[][]): { newBoard: number[][]; linesCleared: number } => {
    const newBoard = gameBoard.filter(row => row.some(cell => cell === EMPTY_CELL));
    const linesCleared = BOARD_HEIGHT - newBoard.length;
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
    }
    
    return { newBoard, linesCleared };
  }, []);

  // Move piece
  const movePiece = useCallback((direction: 'left' | 'right' | 'down') => {
    if (!currentPiece || gameOver || isPaused) return;

    const newPosition = { ...currentPiece.position };
    
    switch (direction) {
      case 'left':
        newPosition.x -= 1;
        break;
      case 'right':
        newPosition.x += 1;
        break;
      case 'down':
        newPosition.y += 1;
        break;
    }

    if (canPlacePiece(currentPiece, newPosition)) {
      setCurrentPiece({ ...currentPiece, position: newPosition });
    } else if (direction === 'down') {
      // Piece can't move down, place it on the board
      const newBoard = placePieceOnBoard(currentPiece);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      setLines(prev => prev + linesCleared);
      setScore(prev => prev + linesCleared * 100 * level);
      
      // Create new piece
      const newPiece = createNewPiece();
      if (canPlacePiece(newPiece, newPiece.position)) {
        setCurrentPiece(newPiece);
      } else {
        setGameOver(true);
        setIsPlaying(false);
      }
    }
  }, [currentPiece, gameOver, isPaused, canPlacePiece, placePieceOnBoard, clearLines, level, createNewPiece]);

  // Rotate current piece
  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotatedShape = rotatePiece(currentPiece.shape);
    if (canPlacePiece(currentPiece, currentPiece.position, rotatedShape)) {
      setCurrentPiece({ ...currentPiece, shape: rotatedShape });
    }
  }, [currentPiece, gameOver, isPaused, rotatePiece, canPlacePiece]);

  // Drop piece instantly
  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = currentPiece.position.y;
    while (canPlacePiece(currentPiece, { ...currentPiece.position, y: newY + 1 })) {
      newY++;
    }
    
    setCurrentPiece({ ...currentPiece, position: { ...currentPiece.position, y: newY } });
    setTimeout(() => movePiece('down'), 50);
  }, [currentPiece, gameOver, isPaused, canPlacePiece, movePiece]);

  // Auto-start game
  useEffect(() => {
    if (!currentPiece && !gameOver) {
      setCurrentPiece(createNewPiece());
    }
  }, [currentPiece, gameOver, createNewPiece]);

  // Game loop
  useEffect(() => {
    if (isPlaying && !isPaused && !gameOver) {
      const speed = Math.max(300, 1200 - (level - 1) * 100); // Slower for mobile
      gameLoopRef.current = setInterval(() => {
        movePiece('down');
      }, speed);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, isPaused, gameOver, level, movePiece]);

  // Update level based on lines cleared
  useEffect(() => {
    setLevel(Math.floor(lines / 10) + 1);
  }, [lines]);

  // Start new game
  const startNewGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL)));
    setCurrentPiece(createNewPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  };

  // Render the game board with larger blocks for mobile
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
              displayBoard[boardY][boardX] = currentPiece.type + 1;
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
            className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-600 rounded-sm"
            style={{
              backgroundColor: cell === EMPTY_CELL ? 'rgba(0, 0, 0, 0.3)' : PIECE_COLORS[cell - 1],
              borderColor: cell === EMPTY_CELL ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
              boxShadow: cell !== EMPTY_CELL ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black/80 to-black/90 text-white overflow-hidden">
      {/* Mobile-first layout */}
      <div className="flex flex-col h-screen">
        {/* Header - Compact for mobile */}
        <div className="flex items-center justify-between p-3 bg-black/30 backdrop-blur-sm border-b border-white/10 flex-shrink-0">
          <button
            onClick={() => (window as any).navigateToHome?.()}
            className="flex items-center text-white hover:text-pink-400 transition-colors bg-white/10 backdrop-blur-sm border border-white/20 py-1.5 px-2.5 rounded-lg hover:bg-white/20 text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Πίσω
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Παιχνίδι
          </h1>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-1.5 rounded-lg transition-all duration-300"
            disabled={!isPlaying || gameOver}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>

        {/* Game Area - Takes most of the screen */}
        <div className="flex-1 flex flex-col items-center justify-center p-2 space-y-2 min-h-0">
          {/* Score Bar - Horizontal on mobile */}
          <div className="w-full max-w-sm bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex-shrink-0">
            <div className="flex justify-between items-center text-xs">
              <div className="text-center">
                <div className="text-xs text-gray-400">Σκορ</div>
                <div className="font-bold" style={{ color: '#f43f5e' }}>{score.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Επίπεδο</div>
                <div className="font-bold text-purple-400">{level}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Γραμμές</div>
                <div className="font-bold" style={{ color: '#f43f5e' }}>{lines}</div>
              </div>
            </div>
          </div>

          {/* Game Board - Centered and larger */}
          <div className="bg-black/50 backdrop-blur-sm border border-white/20 p-2 rounded-xl shadow-lg flex-shrink-0">
            <div className="flex flex-col">
              {renderBoard()}
            </div>
          </div>

          {/* Game Status Messages */}
          {gameOver && (
            <div className="bg-red-900/30 backdrop-blur-sm border p-3 rounded-xl text-center max-w-sm w-full flex-shrink-0" style={{ borderColor: '#f43f5e' }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: '#f43f5e' }}>Game Over!</h2>
              <p className="text-xs mb-2" style={{ color: '#f43f5e' }}>Τελικό Σκορ: {score.toLocaleString()}</p>
              <button
                onClick={startNewGame}
                className="w-full text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg text-xs"
                style={{ background: 'linear-gradient(to right, #8b5cf6, #f43f5e)' }}
              >
                Νέο Παιχνίδι
              </button>
            </div>
          )}

          {isPaused && isPlaying && !gameOver && (
            <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-400/30 p-3 rounded-xl text-center max-w-sm w-full flex-shrink-0">
              <h2 className="text-lg font-bold text-purple-400">Παύση</h2>
              <p className="text-xs text-purple-300 mt-1">Πατήστε το κουμπί παύσης για συνέχεια</p>
            </div>
          )}
        </div>

        {/* Touch Controls - Bottom of screen */}
        <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-3 flex-shrink-0">
          <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
            <button
              onClick={() => movePiece('left')}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-lg flex items-center justify-center transition-all duration-300 active:scale-95"
              disabled={!isPlaying || isPaused || gameOver}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => movePiece('down')}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-lg flex items-center justify-center transition-all duration-300 active:scale-95"
              disabled={!isPlaying || isPaused || gameOver}
            >
              <ArrowDown className="h-5 w-5" />
            </button>
            <button
              onClick={() => movePiece('right')}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-lg flex items-center justify-center transition-all duration-300 active:scale-95"
              disabled={!isPlaying || isPaused || gameOver}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={rotatePieceHandler}
              className="p-3 rounded-lg text-xs font-medium transition-all duration-300 shadow-lg text-white active:scale-95"
              style={{ 
                background: 'linear-gradient(to right, #8b5cf6, #f43f5e)',
                opacity: (!isPlaying || isPaused || gameOver) ? 0.5 : 1
              }}
              disabled={!isPlaying || isPaused || gameOver}
            >
              <RotateCw className="h-5 w-5" />
            </button>
          </div>
          
          {/* Quick Drop Button */}
          <button
            onClick={dropPiece}
            className="w-full mt-2 max-w-sm mx-auto block text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg text-xs active:scale-95"
            style={{ 
              background: 'linear-gradient(to right, #8b5cf6, #f43f5e)',
              opacity: (!isPlaying || isPaused || gameOver) ? 0.5 : 1
            }}
            disabled={!isPlaying || isPaused || gameOver}
          >
            Γρήγορη Πτώση
          </button>
        </div>
      </div>
    </div>
  );
};

export default TetrisPage;