import { useState, MouseEvent, ChangeEvent } from "react";
import { Coordinate2D } from "./utils";

const defaultCoordinate: Coordinate2D = {
  x: 0,
  y: 0,
};

export function usePopup<Element>(initialCoordinate = defaultCoordinate) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Coordinate2D>(initialCoordinate);
  const toggle = (event: MouseEvent<Element>) => {
    setOpen(!open);
    const { clientX, clientY } = event;
    setPosition({
      x: clientX,
      y: clientY,
    });
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
