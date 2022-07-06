import { useRef } from "react";

type FormProps = React.ComponentProps<"form">;

export function Form({ children }: FormProps) {
  return <form className="popup">{children}</form>;
}

type InputItemProps = React.ComponentProps<"div">;

export function InputItem({ children }: InputItemProps) {
  return <div className="popup-form-item">{children}</div>;
}

type InputItemInlineProps = React.ComponentProps<"div">;

export function InputItemInline({ children }: InputItemInlineProps) {
  return <div className="popup-form-item-inline">{children}</div>;
}

type NumberInputProps = React.ComponentProps<"input">;

export function NumberInput(props: NumberInputProps) {
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="\d*"
      className="popup-input"
      {...props}
    />
  );
}

type InputLabelProps = React.ComponentProps<"label">;

export function InputLabel(props: InputLabelProps) {
  return (
    <label htmlFor={props.htmlFor} className="popup-label">
      {props.children}
    </label>
  );
}

type InputCheckboxProps = React.ComponentProps<"input">;

export function InputCheckbox(props: InputCheckboxProps) {
  return (
    <input
      type="checkbox"
      name="imageAspectRatio"
      id="imageAspectRatio"
      className="popup-checkbox"
      {...props}
    />
  );
}

type ButtonProps = React.ComponentProps<"button"> & {
  primary: "primary" | "secondary";
};

export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className={`popup-button ${
        props.primary === "primary" ? "button-primary" : "button-secondary"
      }`}
      {...props}
    ></button>
  );
}

type InputFileButtonProps = React.ComponentProps<"input"> & { label: string };

export function InputFileButton(props: InputFileButtonProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button
        primary={"primary"}
        onClick={(event) => {
          event.preventDefault();
          if (fileRef.current) {
            fileRef.current.click();
          }
        }}
      >
        {props.label}
      </Button>
      <input type="file" className="popup-file" ref={fileRef} {...props} />
    </>
  );
}
