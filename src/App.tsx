import goat from "./goat-square-profile.jpg";
import {
  A4,
  defaultGap,
  generatePosition,
  defaultImageSize,
  Size2D,
} from "./lib/utils";

type PrintSheetProps = {
  paperSize: Size2D;
  imageSize: Size2D;
  gap: number;
};

function PrintSheet({ paperSize, imageSize, gap }: PrintSheetProps) {
  const { width, height } = paperSize;
  const imagePosition = generatePosition(paperSize, imageSize, gap);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      {imagePosition.map(({ x, y }) => (
        <image
          width={imageSize.width}
          height={imageSize.height}
          x={x}
          y={y}
          href={goat}
        />
      ))}
    </svg>
  );
}

function App() {
  return (
    <PrintSheet paperSize={A4} imageSize={defaultImageSize} gap={defaultGap} />
  );
}

export default App;
