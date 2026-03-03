import { Vector2 } from '~/Vector2';

export class Player {
  readonly position = Vector2.zero();

  readonly velocity = Vector2.zero();

  readonly radius = 20;
  readonly friction = 0.985;

  rotation: number = 0;

  constructor(x: number, y: number);

  constructor();

  constructor(x?: number, y?: number) {
    if (x) {
      this.position.x = x;
    }

    if (y) {
      this.position.y = y;
    }
  }

  isPointInside(point: Vector2): boolean {
    const dx = point.x - this.position.x;
    const dy = point.y - this.position.y;

    return Math.hypot(dx, dy) <= this.radius;
  }

  step(viewportWidth: number, viewportHeight: number): this {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    if (Math.abs(this.velocity.x) < 0.01) this.velocity.x = 0;
    if (Math.abs(this.velocity.y) < 0.01) this.velocity.y = 0;

    if (this.position.x - this.radius < 0) {
      this.position.x = this.radius;
      this.velocity.x *= -0.6;
    }
    if (this.position.x + this.radius > viewportWidth) {
      this.position.x = viewportWidth - this.radius;
      this.velocity.x *= -0.6;
    }
    if (this.position.y - this.radius < 0) {
      this.position.y = this.radius;
      this.velocity.y *= -0.6;
    }
    if (this.position.y + this.radius > viewportHeight) {
      this.position.y = viewportHeight - this.radius;
      this.velocity.y *= -0.6;
    }
    return this;
  }
}
