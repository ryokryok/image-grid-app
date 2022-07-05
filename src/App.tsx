import { useEffect } from "react";
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
import {
  Button,
  Form,
  InputCheckbox,
  InputFileButton,
  InputItem,
  InputItemInline,
  InputLabel,
  NumberInput,
} from "./components/Form";

function UserConfigForm() {
  const { imageConfig } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return (
    <Form>
      <InputItem>
        <InputLabel htmlFor="imageWidth">Width (mm)</InputLabel>
        <NumberInput
          name="imageWidth"
          id="imageWidth"
          value={imageConfig.width}
          onChange={(e) => dispatch(updateWidth(e.target.value))}
        />
      </InputItem>
      <InputItem>
        <InputLabel htmlFor="imageHeight">Height (mm)</InputLabel>
        <NumberInput
          name="imageHeight"
          id="imageHeight"
          value={imageConfig.height}
          onChange={(e) => dispatch(updateHeight(e.target.value))}
        />
      </InputItem>
      <InputItemInline>
        <InputCheckbox
          name="imageAspectRatio"
          id="imageAspectRatio"
          checked={imageConfig.fixed}
          onChange={(e) => dispatch(updateFixed(e.target.checked))}
        />
        <InputLabel htmlFor="imageAspectRatio"> Fixed sizing?</InputLabel>
      </InputItemInline>
      <InputItem>
        <InputLabel htmlFor="imageGap">Gap (mm)</InputLabel>
        <NumberInput
          name="imageGap"
          id="imageGap"
          value={imageConfig.gap}
          onChange={(e) => dispatch(updateGap(e.target.value))}
        />
      </InputItem>
      <InputItem>
        <InputFileButton
          label={"File upload"}
          name="imageFile"
          id="imageFile"
          accept={"image/*"}
          onChange={(e) => {
            dispatch(setUrl(e.target.files));
          }}
        />
      </InputItem>
      <InputItem>
        <Button onClick={() => window.print()}>Print</Button>
      </InputItem>
    </Form>
  );
}

type PrintPreviewProps = {
  paperSize: Size2D;
};

function PrintPreview({ paperSize }: PrintPreviewProps) {
  const { imageConfig } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const imagePosition = generatePosition(paperSize, imageConfig);

  return (
    <svg
      viewBox={`0 0 ${paperSize.width} ${paperSize.height}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      onClick={(e) => {
        dispatch(toggle({ x: e.clientX, y: e.clientY }));
      }}
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
  );
}

function Popup() {
  const { popup } = useAppSelector((state) => state);
  const { isOpen, x, y } = popup;
  return (
    <>
      {isOpen ? (
        <div
          style={{
            position: "absolute",
            top: y,
            left: x,
          }}
        >
          <UserConfigForm />
        </div>
      ) : (
        <></>
      )}
    </>
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
      <Popup />
      <PrintPreview paperSize={A4} />
    </>
  );
}

export default App;
