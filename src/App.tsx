import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFileUrl, usePopup } from "./lib/hooks";
import { updateWidth, updateHeight, updateGap } from "./redux/imageConfigSlice";
import { useSelector, useDispatch } from "react-redux";

import { A4, generatePosition, Size2D } from "./lib/utils";
import type { RootState } from "./redux/store";

type PrintSheetProps = {
  paperSize: Size2D;
};

function PrintSheet({ paperSize }: PrintSheetProps) {
  const { imageConfig } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const imagePosition = generatePosition(paperSize, imageConfig);

  const { imageUrl, fileHandler } = useFileUrl("https://picsum.photos/500");
  const { open, position, toggle } = usePopup();

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
          }}
        >
          <form className="popup">
            <div className="popup-form-item">
              <label htmlFor="imageWidth" className="popup-label">
                Width (mm)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                name="imageWidth"
                id="imageWidth"
                className="popup-input"
                value={imageConfig.width}
                onChange={(e) => dispatch(updateWidth(Number(e.target.value)))}
              />
            </div>
            <div className="popup-form-item">
              <label htmlFor="imageHeight" className="popup-label">
                Height (mm)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                name="imageHeight"
                id="imageHeight"
                className="popup-input"
                value={imageConfig.height}
                onChange={(e) => dispatch(updateHeight(Number(e.target.value)))}
              />
            </div>
            <div className="popup-form-item">
              <label htmlFor="imageGap" className="popup-label">
                Gap (mm)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                name="imageGap"
                id="imageGap"
                className="popup-input"
                value={imageConfig.gap}
                onChange={(e) => dispatch(updateGap(Number(e.target.value)))}
              />
            </div>
            <div className="popup-form-item">
              <button
                className="popup-button button-primary"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  if (fileRef.current) {
                    fileRef.current.click();
                  }
                }}
              >
                File upload
              </button>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                className="popup-file"
                onChange={fileHandler}
                accept="image/*"
                ref={fileRef}
              />
            </div>
            <div className="popup-form-item">
              <button
                className="popup-button button-secondary"
                type="button"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <div onClick={toggle}>
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
            />
          ))}
        </svg>
      </div>
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
      <ToastContainer
        position={`top-center`}
        autoClose={4000}
        className="hide-when-print"
      />
      <PrintSheet paperSize={A4} />
    </>
  );
}

export default App;
