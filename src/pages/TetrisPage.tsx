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
  '#00f5ff', // I-piece - cyan
  '#ffff00', // O-piece - yellow
  '#800080', // T-piece - purple
  '#00ff00', // S-piece - green
  '#ff0000', // Z-piece - red
  '#0000ff', // J-piece - blue
  '#ffa500'  // L-piece - orange
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
              backgroundColor: cell === EMPTY_CELL ? '#000' : PIECE_COLORS[cell - 1]
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Πίσω
          </button>
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Tetris
          </h1>
          <div className="w-20"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Game Board */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700">
              <div className="flex flex-col">
                {renderBoard()}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden mt-6 grid grid-cols-3 gap-4 w-full max-w-xs">
              <button
                onClick={() => movePiece('left')}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center justify-center"
                disabled={!isPlaying || isPaused}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={rotatePieceHandler}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center justify-center"
                disabled={!isPlaying || isPaused}
              >
                <RotateCw className="h-6 w-6" />
              </button>
              <button
                onClick={() => movePiece('right')}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center justify-center"
                disabled={!isPlaying || isPaused}
              >
                <ArrowRight className="h-6 w-6" />
              </button>
              <div></div>
              <button
                onClick={() => movePiece('down')}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center justify-center"
                disabled={!isPlaying || isPaused}
              >
                <ArrowDown className="h-6 w-6" />
              </button>
              <button
                onClick={dropPiece}
                className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg text-sm font-medium"
                disabled={!isPlaying || isPaused}
              >
                Drop
              </button>
            </div>
          </div>

          {/* Game Info & Controls */}
          <div className="flex flex-col gap-6">
            {/* Score Panel */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Στατιστικά</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Σκορ:</span>
                  <span className="font-bold text-yellow-400">{score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Επίπεδο:</span>
                  <span className="font-bold text-green-400">{level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Γραμμές:</span>
                  <span className="font-bold text-blue-400">{lines}</span>
                </div>
              </div>
            </div>

            {/* Game Controls */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Έλεγχος</h2>
              <div className="space-y-3">
                {!isPlaying ? (
                  <button
                    onClick={startNewGame}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    {gameOver ? 'Νέο Παιχνίδι' : 'Έναρξη'}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Τέλος Παιχνιδιού
                  </button>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Οδηγίες</h2>
              <div className="space-y-2 text-sm">
                <div><strong>←/→:</strong> Κίνηση αριστερά/δεξιά</div>
                <div><strong>↓:</strong> Γρήγορη πτώση</div>
                <div><strong>↑/Space:</strong> Περιστροφή</div>
                <div><strong>Enter:</strong> Άμεση πτώση</div>
                <div><strong>P:</strong> Παύση</div>
              </div>
            </div>

            {/* Game Status */}
            {gameOver && (
              <div className="bg-red-900 border border-red-700 p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-red-400 mb-2">Game Over!</h2>
                <p className="text-red-300">Τελικό Σκορ: {score.toLocaleString()}</p>
              </div>
            )}

            {isPaused && isPlaying && (
              <div className="bg-yellow-900 border border-yellow-700 p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-yellow-400">Παύση</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisPage;