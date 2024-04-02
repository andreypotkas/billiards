import { Ball } from "./ball";

export class BilliardsDrawer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.canvas.width = window.innerWidth * 0.5;
    this.canvas.height = window.innerHeight * 0.5;
  }

  update(balls: Ball[]) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawTable();
    this.drawBalls(balls);
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
}
