import React, { useState, useEffect } from 'react';
import './App.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('right');
  const [gameOver, setGameOver] = useState(false);

  const GRID_SIZE = 20;
  const GAME_SPEED = 100;

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowRight':
        setDirection('right');
        break;
      case 'ArrowLeft':
        setDirection('left');
        break;
      case 'ArrowUp':
        setDirection('up');
        break;
      case 'ArrowDown':
        setDirection('down');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    const handleGameTick = () => {
      const head = snake[0];
      let newHead = null;

      switch (direction) {
        case 'right':
          newHead = { x: head.x + 1, y: head.y };
          break;
        case 'left':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'up':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'down':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        default:
          break;
      }

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return;
      }

      if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake.slice(0, -1)];
      setSnake(newSnake);

      if (newHead.x === food.x && newHead.y === food.y) {
        const newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
        setFood(newFood);
        setSnake([...newSnake, snake[snake.length - 1]]);
      }
    };

    if (!gameOver) {
      const interval = setInterval(handleGameTick, GAME_SPEED);
      return () => clearInterval(interval);
    }
  }, [snake, food, direction, gameOver]);

  const grid = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const isSnakeSegment = snake.some((segment) => segment.x === x && segment.y === y);
      const isFood = food.x === x && food.y === y;
      const cellClass = isSnakeSegment ? 'snake' : isFood ? 'food' : '';
      grid.push(<div key={`${x}-${y}`} className={`cell ${cellClass}`} />);
    }
  }

  return (
    <div className='mid-gamer'>
      <h1>Snake Game</h1>
    <div className='game-container'>
      {gameOver && <div className="game-over">Game Over</div>}
      <div className="grid">{grid}</div>
      <div className="score">Score: {snake.length - 1}</div>
      </div>
    </div>
  );
};
export default SnakeGame;
