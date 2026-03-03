import type { Player } from '~/Player';

function drawStar({
  context,
  x,
  y,
  outerRadius,
  innerRadius,
  points,
}: {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  outerRadius: number;
  innerRadius: number;
  points: number;
}): void {
  const step = Math.PI / points;

  context.beginPath();

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;

    if (i === 0) {
      context.moveTo(px, py);
      continue;
    }

    context.lineTo(px, py);
  }

  context.closePath();
}

export class Graphics {
  readonly canvas: HTMLCanvasElement;

  readonly context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d')!;
  }

  resetViewport(): this {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    this.context.clearRect(0, 0, width, height);

    return this;
  }

  drawPlayer(player: Player): this {
    this.context.beginPath();
    this.context.arc(
      player.position.x,
      player.position.y,
      player.radius,
      0,
      Math.PI * 2,
    );
    this.context.fillStyle = 'hsl(3deg, 98%, 67%';
    this.context.strokeStyle = 'hsl(0deg, 0%, 0%)';
    this.context.lineWidth = 6;
    this.context.fill();
    this.context.stroke();

    drawStar({
      context: this.context,
      x: player.position.x,
      y: player.position.y,
      outerRadius: player.radius * 0.6,
      innerRadius: player.radius * 0.3,
      points: 5,
    });
    this.context.fillStyle = 'hsl(0deg, 0%, 100%)';
    this.context.fill();

    return this;
  }
}
