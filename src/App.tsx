import { useFileUrl, useImageConfig, usePopup } from "./lib/hooks";
import {
  A4,
  generatePosition,
  defaultImageConfig,
  Size2D,
  ImageConfig,
} from "./lib/utils";

type PrintSheetProps = {
  paperSize: Size2D;
  initialImageConfig: ImageConfig;
};

function PrintSheet({ paperSize, initialImageConfig }: PrintSheetProps) {
  const { imageConfig, widthHandler, heightHandler, gapHandler } =
    useImageConfig(initialImageConfig);
  const imagePosition = generatePosition(paperSize, imageConfig);

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
                value={imageConfig.width}
                onChange={widthHandler}
              />
            </div>
            <div>
              <label htmlFor="imageHeight"> Height (mm)</label>
              <input
                type="number"
                name="imageHeight"
                id="imageHeight"
                value={imageConfig.height}
                onChange={heightHandler}
              />
            </div>
            <div>
              <label htmlFor="imageGap">Gap (mm)</label>
              <input
                type="number"
                name="imageGap"
                id="imageGap"
                value={imageConfig.gap}
                onChange={gapHandler}
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
            width={imageConfig.width}
            height={imageConfig.height}
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
  return <PrintSheet paperSize={A4} initialImageConfig={defaultImageConfig} />;
}

export default App;
