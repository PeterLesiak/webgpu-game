import type { Renderer } from '~/Renderer';

export class Player {
  readonly renderer: Renderer;

  x: number = 0;
  y: number = 0;

  vx: number = 0;
  vy: number = 0;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  draw(): this {
    this.renderer.context.beginPath();
    this.renderer.drawCircle(this.x, this.y, 20);
    this.renderer.context.fillStyle = 'hsl(3deg, 98%, 67%';
    this.renderer.context.strokeStyle = 'hsl(0deg, 0%, 0%)';
    this.renderer.context.lineWidth = 6;
    this.renderer.context.fill();
    this.renderer.context.stroke();

    this.renderer.drawStar({
      x: this.x,
      y: this.y,
      outerRadius: 12,
      innerRadius: 6,
      points: 5,
    });
    this.renderer.context.fillStyle = 'hsl(0deg, 0%, 100%)';
    this.renderer.context.fill();

    return this;
  }
}
