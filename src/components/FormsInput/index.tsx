import React, { forwardRef, ForwardRefRenderFunction } from "react";
import CSS from "csstype";

import { IconBaseProps } from "react-icons";

import styles from "./styles.module.scss";

interface InputProps {
  name: string;
  type: string;
  size?: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const FormsInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type, name, label, icon: Icon, size, ...rest },
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
          {...rest}
        />
        <span>{Icon && <Icon />}</span>
      </div>
    </div>
  );
};

export const FormsInput = forwardRef(FormsInputBase);
