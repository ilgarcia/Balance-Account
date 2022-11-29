import React, {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
} from "react";
import { FieldError } from "react-hook-form";
import CSS from "csstype";

import { IconBaseProps } from "react-icons";

import styles from "./styles.module.scss";

interface InputProps {
  name: string;
  type: string;
  size?: string;
  label?: string;
  value?: string;
  icon?: React.ComponentType<IconBaseProps>;
  error?: FieldError;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormsInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type, name,value, label, icon: Icon, onChange, size, error = null, ...rest },
  ref
) => {
  const inlineStyles: CSS.Properties = {
    maxWidth: size,
    width: "100%",
  };

  return (
    <div className={styles.ngForms}>
      {!!label && <label htmlFor={name}>{label}</label>}
      <div>
        <input
          style={inlineStyles}
          type={type}
          name={name}
          id={name}
          ref={ref}
          value={value}
          onChange={onChange}
          autoComplete="off"
          required
          {...rest}
        />
        <span>{Icon && <Icon />}</span>
      </div>
      {!!error && <div>{error.message}</div>}
    </div>
  );
};

export const FormsInput = forwardRef(FormsInputBase);
