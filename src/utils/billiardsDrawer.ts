import { Ball } from "../utils/ball";

class BilliardsDrawer {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;

  constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  drawTable() {
    this.ctx.fillStyle = "#007f0e";
    this.ctx.fillRect(50, 50, this.canvasWidth - 100, this.canvasHeight - 100);
  }

  drawBalls(balls: Ball[]) {
    balls.forEach((ball) => {
      ball.draw(this.ctx);
    });
  }

  drawBoard(boardWidth: number) {
    const TABLE_PADDING = 50;

    this.ctx.fillStyle = "#964b00";
    this.ctx.fillRect(TABLE_PADDING - boardWidth, TABLE_PADDING - boardWidth, boardWidth, this.canvasHeight - 2 * TABLE_PADDING + 2 * boardWidth);
    this.ctx.fillRect(this.canvasWidth - TABLE_PADDING, TABLE_PADDING - boardWidth, boardWidth, this.canvasHeight - 2 * TABLE_PADDING + 2 * boardWidth);
    this.ctx.fillRect(TABLE_PADDING - boardWidth, TABLE_PADDING - boardWidth, this.canvasWidth - 2 * TABLE_PADDING + 2 * boardWidth, boardWidth);
    this.ctx.fillRect(TABLE_PADDING - boardWidth, this.canvasHeight - TABLE_PADDING, this.canvasWidth - 2 * TABLE_PADDING + 2 * boardWidth, boardWidth);
  }
}

export default BilliardsDrawer;
