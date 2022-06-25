import { useState, MouseEvent } from "react";
import goat from "./goat-square-profile.jpg";
import {
  A4,
  defaultGap,
  generatePosition,
  defaultImageSize,
  Size2D,
  Coordinate2D,
} from "./lib/utils";

type PrintSheetProps = {
  paperSize: Size2D;
  imageSize: Size2D;
  gap: number;
};

function PrintSheet({ paperSize, imageSize, gap }: PrintSheetProps) {
  const { width, height } = paperSize;

  const imagePosition = generatePosition(paperSize, imageSize, gap);

  const [open, setOpen] = useState(false);
  const [postion, setPostion] = useState<Coordinate2D>({ x: 0, y: 0 });
  const handler = (event: MouseEvent<SVGImageElement>) => {
    setOpen(!open);
    const { clientX, clientY } = event;
    setPostion({
      x: clientX,
      y: clientY,
    });
  };
  return (
    <div>
      {open ? (
        <div
          style={{
            backgroundColor: "Highlight",
            position: "absolute",
            padding: "0.25rem 0.5rem",
            top: postion.y + 10,
            left: postion.x + 10,
          }}
        >
          <form>
            <div>
              <label htmlFor="imageWidth">Width (mm) </label>
              <input
                type="number"
                name="imageWidth"
                id="imageWidth"
                value={imageSize.width}
              />
            </div>
            <div>
              <label htmlFor="imageHeight"> Height (mm)</label>
              <input
                type="number"
                name="imageHeight"
                id="imageHeight"
                value={imageSize.height}
              />
            </div>
            <div>
              <label htmlFor="imageGap">Gap (mm)</label>
              <input type="number" name="imageGap" id="imageGap" value={gap} />
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
      >
        {imagePosition.map(({ x, y }) => (
          <image
            key={crypto.randomUUID()}
            width={imageSize.width}
            height={imageSize.height}
            x={x}
            y={y}
            href={goat}
            onClick={handler}
          />
        ))}
      </svg>
    </div>
  );
}

function App() {
  return (
    <PrintSheet paperSize={A4} imageSize={defaultImageSize} gap={defaultGap} />
  );
}

export default App;
