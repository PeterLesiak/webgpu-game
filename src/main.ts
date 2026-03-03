import { Renderer } from '~/Renderer';
import { Player } from '~/Player';
import { randomInt } from './utils';

const canvas = document.createElement('canvas');
document.body.append(canvas);

const renderer = new Renderer(canvas);

const players: Player[] = Array.from({ length: 5 }, () => {
  const player = new Player(renderer);
  player.x = randomInt(500, 1000);
  player.y = randomInt(100, 600);

  return player;
});

const FRICTION = 0.985;
const POWER = 0.08;
const MAX_SPEED = 25;
const BALL_RADIUS = 20;

let activeBall: Player | null = null;
let dragStart: { x: number; y: number } | null = null;

canvas.addEventListener('pointerdown', e => {
  const { x, y } = pointerPos(e);
  for (const ball of players) {
    const dx = x - ball.x;
    const dy = y - ball.y;
    if (Math.hypot(dx, dy) <= BALL_RADIUS) {
      activeBall = ball;
      dragStart = { x, y };
      break;
    }
  }
});

canvas.addEventListener('pointerup', e => {
  if (!activeBall || !dragStart) return;
  const { x, y } = pointerPos(e);
  const dx = dragStart.x - x;
  const dy = dragStart.y - y;
  let vx = dx * POWER;
  let vy = dy * POWER;
  const speed = Math.hypot(vx, vy);
  if (speed > MAX_SPEED) {
    const scale = MAX_SPEED / speed;
    vx *= scale;
    vy *= scale;
  }
  activeBall.vx = vx;
  activeBall.vy = vy;
  activeBall = null;
  dragStart = null;
});

animate();

function animate() {
  requestAnimationFrame(animate);

  renderer.resizeToViewport();

  update();
  render();
}

function render() {
  renderer.clear();

  for (const player of players) {
    player.draw();
  }
}

function update() {
  for (const ball of players) {
    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.vx *= FRICTION;
    ball.vy *= FRICTION;

    if (Math.abs(ball.vx) < 0.01) ball.vx = 0;
    if (Math.abs(ball.vy) < 0.01) ball.vy = 0;

    if (ball.x - BALL_RADIUS < 0) {
      ball.x = BALL_RADIUS;
      ball.vx *= -0.6;
    }
    if (ball.x + BALL_RADIUS > canvas.width) {
      ball.x = canvas.width - BALL_RADIUS;
      ball.vx *= -0.6;
    }
    if (ball.y - BALL_RADIUS < 0) {
      ball.y = BALL_RADIUS;
      ball.vy *= -0.6;
    }
    if (ball.y + BALL_RADIUS > canvas.height) {
      ball.y = canvas.height - BALL_RADIUS;
      ball.vy *= -0.6;
    }
  }
}

function pointerPos(e: PointerEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}
