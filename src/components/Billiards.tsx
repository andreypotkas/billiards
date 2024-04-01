import React, { useEffect, useRef } from "react";
import { Ball } from "../utils/ball";
import { BilliardsDrawer } from "../utils/billiardsDrawer";

const Billiards: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const drawer = new BilliardsDrawer(canvas);

      const numBalls = 20;
      const balls: Ball[] = [];
      const minRadius = 20;
      const maxRadius = 40;
      const border = 60;
      const colors = ["yellow", "green", "blue", "red", "purple", "cyan", "orange"];

      for (let i = 0; i < numBalls; i++) {
        let x: number, y: number, radius: number, color: string;

        do {
          radius = Math.floor(Math.random() * (maxRadius - minRadius + 1) + minRadius);
          x = Math.random() * (canvas.width - 2 * (border + 2 * radius)) + border + radius;
          y = Math.random() * (canvas.height - 2 * (border + 2 * radius)) + border + radius;
          color = colors[Math.floor(Math.random() * colors.length)]; // Выбор случайного цвета из набора
        } while (balls.some((ball) => Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2) < radius + ball.radius));

        balls.push(new Ball(x, y, radius, color));
      }

      drawer.drawTable();
      drawer.drawBalls(balls);
      drawer.drawBoard();
    }
  }, []);

  return <canvas ref={canvasRef} className="canvas"></canvas>;
};

export default Billiards;
