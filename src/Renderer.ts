import type { Player } from '~/Player';
import { drawStar } from '~/utils';
import { Viewport } from '~/Viewport';
import { Vector2 } from './Vector2';

const ColorPalette = {
  Player: 'hsl(3deg, 98%, 67%)',
  GrassPrimary: 'hsl(113, 44%, 48%)',
  GrassSecondary: '	hsl(113, 42%, 45%)',
  Background: 'hsl(16, 89%, 72%)',
} as const;

export class Renderer {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;

  readonly viewport = Viewport.zero();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d', { alpha: false })!;
  }

  resizeViewport(): this {
    const dpr = window.devicePixelRatio;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.context.scale(dpr, dpr);

    this.viewport.set(rect.width, rect.height);

    return this;
  }

  clear(): this {
    this.context.clearRect(0, 0, this.viewport.width, this.viewport.height);

    return this;
  }

  drawBackgroud(): this {
    const board = new Viewport(415, 685);
    const stripeCount = 12;
    const borderWidth = board.width / 25;
    const decorationLineWidth = 5.5;

    this.context.fillStyle = ColorPalette.Background;
    this.context.fillRect(0, 0, this.viewport.width, this.viewport.height);

    const start = new Vector2(
      (this.viewport.width - board.width) * 0.5,
      (this.viewport.height - board.height) * 0.5,
    );

    let currentY = start.y;

    for (let i = 0; i < stripeCount; i++) {
      const isEdge = i === 0 || i === stripeCount - 1;
      const stripeHeight = (board.height / (stripeCount - 1)) * (isEdge ? 0.5 : 1);

      this.context.fillStyle =
        i % 2 === 0 ? ColorPalette.GrassPrimary : ColorPalette.GrassSecondary;
      this.context.fillRect(start.x, currentY, board.width, stripeHeight);

      currentY += stripeHeight;
    }

    this.context.fillStyle = 'white';
    this.context.strokeStyle = 'white';
    this.context.lineWidth = decorationLineWidth;

    this.context.fillRect(start.x, start.y, board.width, borderWidth);
    this.context.fillRect(
      start.x + board.width - borderWidth,
      start.y,
      borderWidth,
      board.height,
    );
    this.context.fillRect(
      start.x,
      start.y + board.height - borderWidth,
      board.width,
      borderWidth,
    );
    this.context.fillRect(start.x, start.y, borderWidth, board.height);

    this.context.fillRect(
      start.x,
      start.y + (board.height - decorationLineWidth) * 0.5,
      board.width,
      decorationLineWidth,
    );

    this.context.beginPath();
    this.context.arc(
      this.viewport.width * 0.5,
      this.viewport.height * 0.5,
      34.5,
      0,
      Math.PI * 2,
    );
    this.context.stroke();

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
    this.context.fillStyle = ColorPalette.Player;
    this.context.fill();
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 6;
    this.context.stroke();

    drawStar({
      context: this.context,
      x: player.position.x,
      y: player.position.y,
      outerRadius: player.radius * 0.6,
      innerRadius: player.radius * 0.3,
      points: 5,
    });
    this.context.fillStyle = 'white';
    this.context.fill();

    return this;
  }
}
