import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

const scale = 10;
const speed = 10;
let score = 0

export default function Home() {

  const router = useRouter()
  const canvas = useRef<HTMLCanvasElement>(null);
  const [snake, setSnakeValue] = useState([
    {
      x: 0,
      y: 0,
      xSpeed: speed,
      ySpeed: 0,
      draw: snakeDraw,
    },
  ]);
  const snakeRef = useRef(snake);


  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  const X = useRef(Math.floor(Math.random() * 50) * scale);
  const Y = useRef(Math.floor(Math.random() * 30) * scale);

  function snakeDraw(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    ctx.fillStyle = "#5500F9";
    ctx.fillRect(x, y, scale, scale);
  }

  function drawFood(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#F00000";
    ctx.fillRect(X.current, Y.current, scale, scale);
  }


  useEffect(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d");
    if (!ctx) return;

    const intervalId = setInterval(() => {
      const prevSnake = snakeRef.current;
      const newSnake = [...prevSnake];
      const positions = prevSnake.map((s) => ({ x: s.x, y: s.y }));


      if (prevSnake[0].x === X.current && prevSnake[0].y === Y.current) {

        score++

        X.current = Math.floor(Math.random() * 50) * scale;
        Y.current = Math.floor(Math.random() * 30) * scale;

        const last = prevSnake[prevSnake.length - 1];
        newSnake.push({
          x: last.x,
          y: last.y,
          xSpeed: 0,
          ySpeed: 0,
          draw: snakeDraw,
        });
      }

      newSnake[0].x += newSnake[0].xSpeed;
      newSnake[0].y += newSnake[0].ySpeed;

      for(let i = 1 ; i < newSnake.length ; i++){
        if(newSnake[0].x == newSnake[i].x && newSnake[0].y == newSnake[i].y){
          router.replace('/lose')
        }
      }


      if (newSnake[0].x >= canvas.current!.width) newSnake[0].x = 0;
      if (newSnake[0].x < 0) newSnake[0].x = canvas.current!.width - scale;
      if (newSnake[0].y >= canvas.current!.height) newSnake[0].y = 0;
      if (newSnake[0].y < 0) newSnake[0].y = canvas.current!.height - scale;

 
      for (let i = 1; i < newSnake.length; i++) {
        newSnake[i].x = positions[i - 1].x;
        newSnake[i].y = positions[i - 1].y;
      }

      setSnakeValue(newSnake);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);


  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.replace("Arrow", "");

    setSnakeValue((prev) => {
      const head = prev[0];
      let newHead = { ...head };

      if (key === "Up" && head.ySpeed === 0) {
        newHead.xSpeed = 0;
        newHead.ySpeed = -speed;
      } else if (key === "Down" && head.ySpeed === 0) {
        newHead.xSpeed = 0;
        newHead.ySpeed = speed;
      } else if (key === "Left" && head.xSpeed === 0) {
        newHead.xSpeed = -speed;
        newHead.ySpeed = 0;
      } else if (key === "Right" && head.xSpeed === 0) {
        newHead.xSpeed = speed;
        newHead.ySpeed = 0;
      } else {
        return prev;
      }

      const newSnake = [...prev];
      newSnake[0] = newHead;
      return newSnake;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawFood(ctx);
    snake.forEach((item) => {
      item.draw(ctx, item.x, item.y, scale);
    });
  }, [snake]);

  return (
    <>
      <h1 className="pl-5 pb-10 pt-5">your score: {score}</h1>

      <canvas
        ref={canvas}
        width={500}
        height={300}
        className="bg-amber-300 m-8 border border-black"
      ></canvas>
    </>
  );
}
