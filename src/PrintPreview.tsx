import { useEffect } from "react";
import { Size2D, generatePosition, round } from "./lib/utils";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { updateAspectRatio } from "./redux/imageConfigSlice";
import { toggle } from "./redux/popupSlice";

type PrintPreviewProps = {
  paperSize: Size2D;
};

export function PrintPreview({ paperSize }: PrintPreviewProps) {
  const { imageConfig } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const imagePosition = generatePosition(paperSize, imageConfig);
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const { naturalWidth, naturalHeight } = image;
      const aspectRatio = round(naturalWidth / naturalHeight, 2);
      dispatch(updateAspectRatio(aspectRatio));
    };
    image.src = imageConfig.url;
    return () => {};
  }, [imageConfig.url]);

  return (
    <svg
      viewBox={`0 0 ${paperSize.width} ${paperSize.height}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      className="print-preview"
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
        />
      ))}
    </svg>
  );
}
