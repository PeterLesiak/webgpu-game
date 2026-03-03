import { Graphics } from '~/Graphics';
import { Player } from '~/Player';
import { Vector2 } from '~/Vector2';

const canvas = document.createElement('canvas');
document.body.append(canvas);

const graphics = new Graphics(canvas);

const players: Player[] = [new Player(300, 300), new Player(600, 400)];

let activePlayer: Player | null = null;
let dragStart: Vector2 | null = null;

canvas.addEventListener('pointerdown', e => {
  const rect = canvas.getBoundingClientRect();
  const point = new Vector2(e.clientX - rect.left, e.clientY - rect.top);

  for (const player of players) {
    if (player.isPointInside(point)) {
      activePlayer = player;
      dragStart = point;

      break;
    }
  }
});

const POWER = 0.08;
const MAX_SPEED = 25;

canvas.addEventListener('pointerup', e => {
  if (!activePlayer || !dragStart) return;

  const rect = canvas.getBoundingClientRect();
  const point = new Vector2(e.clientX - rect.left, e.clientY - rect.top);

  const dx = dragStart.x - point.x;
  const dy = dragStart.y - point.y;

  let vx = dx * POWER;
  let vy = dy * POWER;

  const speed = Math.hypot(vx, vy);

  if (speed > MAX_SPEED) {
    const scale = MAX_SPEED / speed;
    vx *= scale;
    vy *= scale;
  }

  activePlayer.velocity.x = vx;
  activePlayer.velocity.y = vy;

  activePlayer = null;
  dragStart = null;
});

animate();

function animate() {
  requestAnimationFrame(animate);

  graphics.resetViewport();

  update();
  render();
}

function update() {
  const width = graphics.canvas.width;
  const height = graphics.canvas.height;

  for (const player of players) {
    player.step(width, height);
  }
}

function render() {
  for (const player of players) {
    graphics.drawPlayer(player);
  }
}
