export class Viewport {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  static zero(): Viewport {
    return new Viewport(0, 0);
  }

  set(width: number, height: number): this {
    this.width = width;
    this.height = height;

    return this;
  }

  aspect(): number {
    return this.width / this.height;
  }
}
