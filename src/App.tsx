import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  updateWidth,
  updateHeight,
  updateGap,
  updateFixed,
  setUrl,
  updateAspectRatio,
} from "./redux/imageConfigSlice";

import { toggle } from "./redux/popupSlice";
import { useAppSelector, useAppDispatch } from "./redux/hooks";

import { A4, generatePosition, round, Size2D } from "./lib/utils";

type PrintSheetProps = {
  paperSize: Size2D;
};

function PrintSheet({ paperSize }: PrintSheetProps) {
  const { imageConfig, popup } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const imagePosition = generatePosition(paperSize, imageConfig);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {popup.isOpen ? (
        <div
          style={{
            position: "absolute",
            top: popup.y,
            left: popup.x,
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
                onChange={(e) => dispatch(updateWidth(e.target.value))}
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
                onChange={(e) => dispatch(updateHeight(e.target.value))}
              />
            </div>
            <div className="popup-form-item-inline">
              <input
                type="checkbox"
                name="imageAspectRatio"
                id="imageAspectRatio"
                className="popup-checkbox"
                checked={imageConfig.fixed}
                onChange={(e) => dispatch(updateFixed(e.target.checked))}
              />
              <label htmlFor="imageAspectRatio" className="popup-label">
                Fixed sizing?
              </label>
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
                onChange={(e) => dispatch(updateGap(e.target.value))}
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
                onChange={(e) => {
                  dispatch(setUrl(e.target.files));
                }}
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
      <div
        onClick={(e) => {
          dispatch(toggle({ x: e.clientX, y: e.clientY }));
        }}
      >
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
              href={imageConfig.url}
              onLoad={() => {
                const image = new Image();
                image.onload = () => {
                  const { naturalWidth, naturalHeight } = image;
                  const aspectRatio = round(naturalWidth / naturalHeight, 2);
                  dispatch(updateAspectRatio(aspectRatio));
                };
                image.src = imageConfig.url;
              }}
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
