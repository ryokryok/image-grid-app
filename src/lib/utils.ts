export type Size2D = {
  width: number;
  height: number;
};

export const A4: Size2D = {
  // mm scale
  width: 210,
  height: 297,
};

export type ImageConfig = Size2D & {
  gap: number;
};

export type Coordinate2D = {
  x: number;
  y: number;
};

export function generatePosition(
  paper: Size2D,
  image: ImageConfig
): Coordinate2D[] {
  const position = [];

  const rangeX = Math.floor(paper.width / (image.width + image.gap));
  const rangeY = Math.floor(paper.height / (image.height + image.gap));

  for (let indexX = 0; indexX < rangeX; indexX++) {
    for (let indexY = 0; indexY < rangeY; indexY++) {
      const postionX = image.gap + indexX * (image.width + image.gap);
      const positionY = image.gap + indexY * (image.height + image.gap);
      position.push({ x: postionX, y: positionY });
    }
  }
  return position;
}

export function round(value: number, digits = 0): number {
  return parseFloat(value.toFixed(digits));
}
