import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            position: "absolute",
            // offset for mouse cursor
            top: position.y + 10,
            left: position.x + 10,
          }}
        >
          <form className="popup">
            <div className="popup-form-item">
              <label htmlFor="imageWidth" className="popup-label">
                Width (mm)
              </label>
              <input
                type="number"
                name="imageWidth"
                id="imageWidth"
                className="popup-input"
                value={imageConfig.width}
                onChange={widthHandler}
              />
            </div>
            <div className="popup-form-item">
              <label htmlFor="imageHeight" className="popup-label">
                {" "}
                Height (mm)
              </label>
              <input
                type="number"
                name="imageHeight"
                id="imageHeight"
                className="popup-input"
                value={imageConfig.height}
                onChange={heightHandler}
              />
            </div>
            <div className="popup-form-item">
              <label htmlFor="imageGap" className="popup-label">
                Gap (mm)
              </label>
              <input
                type="number"
                name="imageGap"
                id="imageGap"
                className="popup-input"
                value={imageConfig.gap}
                onChange={gapHandler}
              />
            </div>
            <div>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                className="popup-file"
                onChange={fileHandler}
                accept="image/*"
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
  const notify = () =>
    toast.info("Click image to edit!", {
      icon: false,
    });
  toast.info("This site is for A4 size printing!", {
    icon: false,
  });

  useEffect(() => {
    notify();
    return () => {};
  }, []);

  return (
    <>
      <ToastContainer position={`top-center`} autoClose={4000} />
      <PrintSheet paperSize={A4} initialImageConfig={defaultImageConfig} />
    </>
  );
}

export default App;
