import { Ball } from "./ball";

const numBalls = 20;
const minRadius = 20;
const maxRadius = 40;
const border = 60;
const colors = ["yellow", "blue", "red", "purple", "cyan", "orange"];

export const generateBalls = (width: number, height: number) => {
  const balls = [] as Ball[];
  for (let i = 0; i < numBalls; i++) {
    let x: number, y: number, radius: number, color: string;

    do {
      radius = Math.floor(Math.random() * (maxRadius - minRadius + 1) + minRadius);
      x = Math.random() * (width - 2 * (border + 2 * radius)) + border + radius;
      y = Math.random() * (height - 2 * (border + 2 * radius)) + border + radius;
      color = colors[Math.floor(Math.random() * colors.length)];
    } while (balls.some((ball) => Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2) < radius + ball.radius));

    balls.push(new Ball(x, y, radius, color));
  }

  return balls;
};
