export function drawStar({
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
