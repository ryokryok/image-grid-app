import {
  Form,
  InputItem,
  InputLabel,
  NumberInput,
  InputItemInline,
  InputCheckbox,
  InputFileButton,
  Button,
} from "./components/Form";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import {
  updateWidth,
  updateHeight,
  updateFixed,
  updateGap,
  setUrl,
} from "./redux/imageConfigSlice";

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
        <Button primary={"secondary"} onClick={() => window.print()}>
          Print
        </Button>
      </InputItem>
    </Form>
  );
}

export function Popup() {
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
