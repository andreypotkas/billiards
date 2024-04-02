import { Ball } from "./ball";

const updateBallPosition = (ball: Ball) => {
  ball.x += ball.vx;
  ball.y += ball.vy;
};

const checkCollisionWithRightLeftWalls = (ball: Ball, width: number) => {
  if (ball.x - ball.radius < 2) {
    ball.vx *= -1;
  } else if (ball.x + ball.radius + 2 > width) {
    ball.vx *= -1;
  }
};

const checkCollisionWithTopBottomWalls = (ball: Ball, height: number) => {
  if (ball.y - ball.radius < 0) {
    ball.vy *= -1;
  } else if (ball.y + ball.radius > height) {
    ball.vy *= -1;
  }
};

const checkCollisionWithOtherBalls = (ball: Ball, index: number, balls: Ball[]) => {
  for (let j = index + 1; j < balls.length; j++) {
    const otherCircle = balls[j];
    const dx = otherCircle.x - ball.x;
    const dy = otherCircle.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + otherCircle.radius) {
      const angle = Math.atan2(dy, dx);

      const totalRadius = ball.radius + otherCircle.radius;
      const overlap = totalRadius - distance;
      const force = overlap;

      const dampingFactor = 0.2;
      ball.vx -= force * Math.cos(angle) * dampingFactor + ball.vx * 0.5;
      ball.vy -= force * Math.sin(angle) * dampingFactor + ball.vy * 0.5;
      otherCircle.vx += force * Math.cos(angle) * dampingFactor;
      otherCircle.vy += force * Math.sin(angle) * dampingFactor;
    }
  }
};

export const ticker = (balls: Ball[], width: number, height: number) => {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];

    updateBallPosition(ball);
    checkCollisionWithRightLeftWalls(ball, width);
    checkCollisionWithTopBottomWalls(ball, height);
    checkCollisionWithOtherBalls(ball, i, balls);
  }
};
