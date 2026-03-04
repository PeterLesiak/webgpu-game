import { Vector2 } from '~/Vector2';
import type { Viewport } from '~/Viewport';

export class Player {
  readonly position = Vector2.zero();
  readonly velocity = Vector2.zero();

  rotation: number = 0;

  readonly radius = 20;
  readonly friction = 0.985;

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

  step(deltaTime: number, viewport: Viewport): this {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    const damping = Math.exp(-this.friction * deltaTime);
    this.velocity.x *= damping;
    this.velocity.y *= damping;

    if (Math.abs(this.velocity.x) < 1) {
      this.velocity.x = 0;
    }

    if (Math.abs(this.velocity.y) < 1) {
      this.velocity.y = 0;
    }

    if (this.position.x - this.radius < 0) {
      this.position.x = this.radius;
      this.velocity.x *= -0.6;
    }
    if (this.position.x + this.radius > viewport.width) {
      this.position.x = viewport.width - this.radius;
      this.velocity.x *= -0.6;
    }

    if (this.position.y - this.radius < 0) {
      this.position.y = this.radius;
      this.velocity.y *= -0.6;
    }
    if (this.position.y + this.radius > viewport.height) {
      this.position.y = viewport.height - this.radius;
      this.velocity.y *= -0.6;
    }

    return this;
  }
}
