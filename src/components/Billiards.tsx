import React, { useCallback, useEffect, useRef, useState } from "react";
import { Ball } from "../utils/ball";
import { BilliardsDrawer } from "../utils/billiardsDrawer";
import { generateBalls } from "../utils/generateBalls";
import { ticker } from "../utils/ticker";
import Modal from "./Modal";

let balls = [] as Ball[];

const Billiards: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickerRef = useRef<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [selectedBall, setSelectedBall] = useState<Ball | null>(null);

  const checkClickOnBall = (e: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const collidedBall = balls.find((ball) => {
      const distance = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
      return distance <= ball.radius;
    });

    return collidedBall ? { collidedBall, mouseX, mouseY } : false;
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
    canvasRef.current!.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    canvasRef.current!.style.cursor = "auto";
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown) {
        const isClick = checkClickOnBall(e);

        if (isClick) {
          const { collidedBall, mouseX, mouseY } = isClick;
          const diffX = collidedBall.x - mouseX;
          const diffY = collidedBall.y - mouseY;

          collidedBall.vx = diffX / 2;
          collidedBall.vy = diffY / 2;
        }
      }
    },
    [isMouseDown]
  );

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    const isClick = checkClickOnBall(e);

    if (isClick) {
      const { collidedBall } = isClick;
      setSelectedBall(collidedBall);
    }
  }, []);

  const onClose = () => {
    setSelectedBall(null);
    handleMouseUp();
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const drawer = new BilliardsDrawer(canvas);
      balls = generateBalls(canvas.width, canvas.height);

      tickerRef.current = setInterval(() => {
        drawer.update(balls);
        ticker(balls, canvas.width, canvas.height);
      }, 16);

      return () => {
        tickerRef.current && clearInterval(tickerRef.current);
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("contextmenu", handleContextMenu);

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, [isMouseDown, handleMouseMove, handleContextMenu]);

  return (
    <>
      {selectedBall && <Modal ball={selectedBall} onClose={onClose} />}
      <canvas ref={canvasRef} className="canvas"></canvas>;
    </>
  );
};

export default Billiards;
