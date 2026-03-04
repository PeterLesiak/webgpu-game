import { Renderer } from '~/Renderer';
import { Player } from '~/Player';

export class Scene {
  readonly canvas: HTMLCanvasElement;
  readonly renderer: Renderer;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new Renderer(this.canvas);
  }

  readonly players: Player[] = [new Player(300, 300), new Player(600, 400)];

  update(deltaTime: number): this {
    this.renderer.resizeViewport();

    for (const player of this.players) {
      player.step(deltaTime, this.renderer.viewport);
    }

    return this;
  }

  render(): this {
    this.renderer.clear();
    this.renderer.drawBackgroud();

    for (const player of this.players) {
      this.renderer.drawPlayer(player);
    }

    return this;
  }
}
