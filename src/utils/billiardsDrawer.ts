import { Ball } from "./ball";

const BOARD_WIDTH = 60;

export class BilliardsDrawer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.canvas.width = window.innerWidth * 0.9;
    this.canvas.height = window.innerHeight * 0.8;
  }

  drawTable() {
    const { width, height } = this.canvas;
    this.ctx.fillStyle = "#007f0e";
    this.ctx.fillRect(0, 0, width, height);
  }

  drawBalls(balls: Ball[]) {
    balls.forEach((ball) => {
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  drawBoard() {
    const { width, height } = this.canvas;
    this.ctx.fillStyle = "#964b00";
    this.ctx.fillRect(0, 0, BOARD_WIDTH, height);
    this.ctx.fillRect(width - 60, 0, BOARD_WIDTH, height);
    this.ctx.fillRect(0, 0, width, BOARD_WIDTH);
    this.ctx.fillRect(60, height - 60, width - 60, BOARD_WIDTH);
  }
}
