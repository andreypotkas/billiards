import React, { useEffect, useRef, useState } from "react";
import { Ball } from "../utils/ball";
import BilliardsDrawer from "../utils/billiardsDrawer";

const BOARD_WIDTH = 60;
const BALL_RADIUS = 30;
const ROW_GAP_X = 6;
const BALL_ROWS = 5;
const BALLS_IN_ROWS = [1, 2, 3, 4, 5];

const Billiards: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>([]);

  const initializeBalls = () => {
    const xOffset = canvasRef.current!.width * (3 / 5);
    const yOffset = canvasRef.current!.height / 2;

    const newBalls: Ball[] = [];
    let currentX = xOffset;
    let currentY = yOffset;

    for (let i = 0; i < BALL_ROWS; i++) {
      for (let j = 0; j < BALLS_IN_ROWS[i]; j++) {
        newBalls.push(new Ball(currentX, currentY, BALL_RADIUS, "#ffffff"));
        currentY += BALL_RADIUS * 2 + ROW_GAP_X;
      }
      currentY = yOffset - (BALL_RADIUS * 2 * (i + 1)) / 2;
      currentX += BALL_RADIUS * 2 - ROW_GAP_X;
    }
    setBalls(newBalls);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && canvas) {
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.8;

      const billiardsDrawer = new BilliardsDrawer(ctx, canvas.width, canvas.height);
      billiardsDrawer.drawTable();
      billiardsDrawer.drawBalls(balls);
      billiardsDrawer.drawBoard(BOARD_WIDTH);
    }
  }, [balls]);

  useEffect(() => {
    initializeBalls();
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    console.log(e);
  };

  return <canvas ref={canvasRef} className="canvas" onClick={handleCanvasClick}></canvas>;
};

export default Billiards;
