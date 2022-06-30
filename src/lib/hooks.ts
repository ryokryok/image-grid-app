import { useState, MouseEvent, ChangeEvent } from "react";
import { Coordinate2D, ImageConfig } from "./utils";

const defaultCoordinate: Coordinate2D = {
  x: 0,
  y: 0,
};

export function usePopup(initialCoordinate = defaultCoordinate) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Coordinate2D>(initialCoordinate);
  const toggle = (event: MouseEvent<HTMLElement>) => {
    setOpen(!open);
    const { clientX, clientY } = event;
    setPosition({
      x: clientX,
      y: clientY,
    });
  };

  // auto close popup to print
  window.onbeforeprint = (event) => {
    setOpen(false);
  };

  return { open, position, toggle };
}

export function useFileUrl(initialUrl: string) {
  const [imageUrl, setImageUrl] = useState(initialUrl);

  const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      URL.revokeObjectURL(imageUrl);
      const objectUrl = URL.createObjectURL(event.currentTarget.files[0]);
      setImageUrl(objectUrl);
    }
  };

  return { imageUrl, fileHandler };
}

export function useImageConfig(initialImageConfig: ImageConfig) {
  const [imageConfig, setImageConfig] = useState(initialImageConfig);

  const widthHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setImageConfig({
      ...imageConfig,
      width: Number(event.target.value),
    });
  };

  const heightHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setImageConfig({
      ...imageConfig,
      height: Number(event.target.value),
    });
  };

  const gapHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setImageConfig({
      ...imageConfig,
      gap: Number(event.target.value),
    });
  };

  return { imageConfig, widthHandler, heightHandler, gapHandler };
}
