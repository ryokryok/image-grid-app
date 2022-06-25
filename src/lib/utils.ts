export type Size2D = {
  width: number;
  height: number;
};

export const A4: Size2D = {
  // mm scale
  width: 210,
  height: 297,
};

export const defaultImageSize: Size2D = {
  // mm scale
  width: 80,
  height: 80,
};

export const defaultGap = 5;

export type Coordinate2D = {
  x: number;
  y: number;
};

export function generatePosition(
  paper: Size2D,
  image: Size2D,
  gap: number
): Coordinate2D[] {
  const position = [];

  const rangeX = Math.floor(paper.width / (image.width + gap));
  const rangeY = Math.floor(paper.height / (image.height + gap));

  for (let indexX = 0; indexX < rangeX; indexX++) {
    for (let indexY = 0; indexY < rangeY; indexY++) {
      const postionX = gap + indexX * (image.width + gap);
      const positionY = gap + indexY * (image.height + gap);
      position.push({ x: postionX, y: positionY });
    }
  }
  return position;
}
