export class Renderer {
  readonly canvas: HTMLCanvasElement;

  readonly context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d')!;
  }

  resizeToViewport(): this {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    return this;
  }

  clear(): this {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    return this;
  }

  drawCircle(x: number, y: number, radius: number): this {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2);

    return this;
  }

  drawStar({
    x,
    y,
    outerRadius,
    innerRadius,
    points,
  }: {
    x: number;
    y: number;
    outerRadius: number;
    innerRadius: number;
    points: number;
  }): this {
    const step = Math.PI / points;

    this.context.beginPath();

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step - Math.PI / 2;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;

      if (i === 0) {
        this.context.moveTo(px, py);
        continue;
      }

      this.context.lineTo(px, py);
    }

    this.context.closePath();

    return this;
  }
}
