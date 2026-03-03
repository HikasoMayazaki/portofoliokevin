import React, { useEffect, useRef, useState } from "react";
import "../assets/css/SnakeGame.css";

const GRID_SIZE = 20;
const TILE_SIZE = 18;
const SPEED = 120;

type Point = { x: number; y: number };

const getRandomFood = (): Point => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
  ]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>(getRandomFood);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (dir.y === 0) setDir({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (dir.y === 0) setDir({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (dir.x === 0) setDir({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (dir.x === 0) setDir({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dir]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setSnake((prev) => {
        if (gameOver) return prev;

        const head = prev[0];
        const next = { x: head.x + dir.x, y: head.y + dir.y };

        if (
          next.x < 0 ||
          next.y < 0 ||
          next.x >= GRID_SIZE ||
          next.y >= GRID_SIZE ||
          prev.some((p) => p.x === next.x && p.y === next.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [next, ...prev];

        if (next.x === food.x && next.y === food.y) {
          setFood(getRandomFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, SPEED);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dir, food, gameOver]);

  const reset = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
    ]);
    setDir({ x: 1, y: 0 });
    setFood(getRandomFood());
    setGameOver(false);
  };

  return (
    <div className="snake-wrapper" style={styles.wrapper}>
      <div className="snake-window" style={styles.window}>
        <div className="snake-titleBar" style={styles.titleBar}>SNAKE.EXE</div>

        <div
          className="snake-board"
          style={{
            ...styles.board,
            width: GRID_SIZE * TILE_SIZE,
            height: GRID_SIZE * TILE_SIZE,
          }}
        >
          {snake.map((p, i) => (
            <div
              key={i}
              className="snake-segment"
              style={{
                ...styles.snake,
                left: p.x * TILE_SIZE,
                top: p.y * TILE_SIZE,
              }}
            />
          ))}

          <div
            className="snake-food"
            style={{
              ...styles.food,
              left: food.x * TILE_SIZE,
              top: food.y * TILE_SIZE,
            }}
          />
        </div>

        <div className="snake-footer" style={styles.footer}>
          {gameOver ? (
            <>
              <span className="snake-error" style={styles.error}>GAME OVER</span>
              <button className="snake-button" style={styles.button} onClick={reset}>
                RESTART
              </button>
            </>
          ) : (
            <span>SCORE: {snake.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "monospace",
  },
  window: {
    background: "#111",
    border: "2px solid #00ff66",
    boxShadow: "0 0 25px #00ff66",
  },
  titleBar: {
    background: "#003300",
    color: "#00ff66",
    padding: "6px 10px",
    fontWeight: "bold",
    borderBottom: "2px solid #00ff66",
  },
  board: {
    position: "relative",
    background: "#000",
    imageRendering: "pixelated",
  },
  snake: {
    position: "absolute",
    width: TILE_SIZE,
    height: TILE_SIZE,
    background: "#00ff66",
    boxShadow: "0 0 6px #00ff66",
  },
  food: {
    position: "absolute",
    width: TILE_SIZE,
    height: TILE_SIZE,
    background: "#ff0033",
    boxShadow: "0 0 8px #ff0033",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 10px",
    color: "#00ff66",
    borderTop: "2px solid #00ff66",
  },
  error: {
    color: "#ff0033",
    fontWeight: "bold",
  },
  button: {
    background: "#000",
    color: "#00ff66",
    border: "1px solid #00ff66",
    padding: "4px 8px",
    cursor: "pointer",
  },
};