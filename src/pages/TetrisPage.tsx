import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, RotateCw, ArrowDown, ArrowRight } from 'lucide-react';

// Tetris game constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
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
  'rgba(219, 39, 119, 0.9)',  // O-piece - pink-600
  'rgba(168, 85, 247, 0.9)',  // T-piece - purple-500
  'rgba(244, 114, 182, 0.9)', // S-piece - pink-400
  'rgba(147, 51, 234, 0.9)',  // Z-piece - purple-600
  'rgba(236, 72, 153, 0.9)',  // J-piece - pink-500
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
  const [isPlaying, setIsPlaying] = useState(false);
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

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          movePiece('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          movePiece('right');
          break;
        case 'ArrowDown':
          event.preventDefault();
          movePiece('down');
          break;
        case 'ArrowUp':
        case ' ':
          event.preventDefault();
          rotatePieceHandler();
          break;
        case 'Enter':
          event.preventDefault();
          dropPiece();
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, movePiece, rotatePieceHandler, dropPiece]);

  // Game loop
  useEffect(() => {
    if (isPlaying && !isPaused && !gameOver) {
      const speed = Math.max(100, 1000 - (level - 1) * 100);
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

  // Render the game board
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
            className="w-6 h-6 border border-gray-600"
            style={{
              backgroundColor: cell === EMPTY_CELL ? 'rgba(0, 0, 0, 0.3)' : PIECE_COLORS[cell - 1],
              borderColor: cell === EMPTY_CELL ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/80 to-black/90 text-white p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-white hover:text-pink-400 transition-colors bg-white/10 backdrop-blur-sm border border-white/20 py-2 px-4 rounded-lg hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Πίσω
          </button>
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Παιχνίδι
          </h1>
          <div className="w-20"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Game Board */}
          <div className="flex flex-col items-center">
            <div className="bg-black/50 backdrop-blur-sm border border-white/20 p-4 rounded-xl shadow-lg">
              <div className="flex flex-col">
                {renderBoard()}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden mt-6 grid grid-cols-3 gap-4 w-full max-w-xs">
              <button
                onClick={() => movePiece('left')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-4 rounded-lg flex items-center justify-center transition-all duration-300"
                disabled={!isPlaying || isPaused}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={rotatePieceHandler}
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-4 rounded-lg flex items-center justify-center transition-all duration-300"
                disabled={!isPlaying || isPaused}
              >
                <RotateCw className="h-6 w-6" />
              </button>
              <button
                onClick={() => movePiece('right')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-4 rounded-lg flex items-center justify-center transition-all duration-300"
                disabled={!isPlaying || isPaused}
              >
                <ArrowRight className="h-6 w-6" />
              </button>
              <div></div>
              <button
                onClick={() => movePiece('down')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-4 rounded-lg flex items-center justify-center transition-all duration-300"
                disabled={!isPlaying || isPaused}
              >
                <ArrowDown className="h-6 w-6" />
              </button>
              <button
                onClick={dropPiece}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg"
                disabled={!isPlaying || isPaused}
              >
                Drop
              </button>
            </div>
          </div>

          {/* Game Info & Controls */}
          <div className="flex flex-col gap-6">
            {/* Score Panel */}
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Στατιστικά</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Σκορ:</span>
                  <span className="font-bold text-pink-400">{score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Επίπεδο:</span>
                  <span className="font-bold text-purple-400">{level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Γραμμές:</span>
                  <span className="font-bold text-pink-300">{lines}</span>
                </div>
              </div>
            </div>

            {/* Game Controls */}
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Έλεγχος</h2>
              <div className="space-y-3">
                {!isPlaying ? (
                  <button
                    onClick={startNewGame}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg"
                  >
                    {gameOver ? 'Νέο Παιχνίδι' : 'Έναρξη'}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
                  >
                    {isPaused ? 'Συνέχεια' : 'Παύση'}
                  </button>
                )}
                
                {isPlaying && (
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setGameOver(true);
                    }}
                    className="w-full bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-600/80 hover:to-pink-600/80 backdrop-blur-sm border border-red-400/30 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
                  >
                    Τέλος Παιχνιδιού
                  </button>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Οδηγίες</h2>
              <div className="space-y-2 text-sm">
                <div><strong className="text-purple-400">←/→:</strong> Κίνηση αριστερά/δεξιά</div>
                <div><strong className="text-purple-400">↓:</strong> Γρήγορη πτώση</div>
                <div><strong className="text-purple-400">↑/Space:</strong> Περιστροφή</div>
                <div><strong className="text-purple-400">Enter:</strong> Άμεση πτώση</div>
                <div><strong className="text-purple-400">P:</strong> Παύση</div>
              </div>
            </div>

            {/* Game Status */}
            {gameOver && (
              <div className="bg-red-900/30 backdrop-blur-sm border border-red-400/30 p-6 rounded-xl text-center">
                <h2 className="text-2xl font-bold text-red-400 mb-2">Game Over!</h2>
                <p className="text-red-300">Τελικό Σκορ: {score.toLocaleString()}</p>
              </div>
            )}

            {isPaused && isPlaying && (
              <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-400/30 p-6 rounded-xl text-center">
                <h2 className="text-2xl font-bold text-purple-400">Παύση</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisPage;