import { useState } from "react";
import { useFileUrl, usePopup } from "./lib/hooks";
import {
  A4,
  defaultGap,
  generatePosition,
  defaultImageSize,
  Size2D,
} from "./lib/utils";

type PrintSheetProps = {
  paperSize: Size2D;
  initialImageSize: Size2D;
  initialGap: number;
};

function PrintSheet({
  paperSize,
  initialImageSize,
  initialGap,
}: PrintSheetProps) {
  const [gap, setGap] = useState(initialGap);
  const [imageSize, setImageSize] = useState(initialImageSize);
  const imagePosition = generatePosition(paperSize, imageSize, gap);

  const { imageUrl, fileHandler } = useFileUrl("https://picsum.photos/500");
  const { open, position, toggle } = usePopup<SVGImageElement>();

  return (
    <div>
      {open ? (
        <div
          style={{
            backgroundColor: "Highlight",
            position: "absolute",
            padding: "0.25rem 0.5rem",
            // offset for mouse cursor
            top: position.y + 10,
            left: position.x + 10,
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
                onChange={(event) => {
                  setImageSize({
                    ...imageSize,
                    width: Number(event.target.value),
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="imageHeight"> Height (mm)</label>
              <input
                type="number"
                name="imageHeight"
                id="imageHeight"
                value={imageSize.height}
                onChange={(event) => {
                  setImageSize({
                    ...imageSize,
                    height: Number(event.target.value),
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="imageGap">Gap (mm)</label>
              <input
                type="number"
                name="imageGap"
                id="imageGap"
                value={gap}
                onChange={(event) => {
                  setGap(Number(event.target.value));
                }}
              />
            </div>
            <div>
              <label htmlFor="imageFile">Image</label>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                onChange={fileHandler}
              />
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <svg
        viewBox={`0 0 ${paperSize.width} ${paperSize.height}`}
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
            href={imageUrl}
            onClick={toggle}
          />
        ))}
      </svg>
    </div>
  );
}

function App() {
  return (
    <PrintSheet
      paperSize={A4}
      initialImageSize={defaultImageSize}
      initialGap={defaultGap}
    />
  );
}

export default App;
