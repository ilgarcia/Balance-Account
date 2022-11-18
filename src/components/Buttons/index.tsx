import React, { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";

import styles from "./styles.module.scss"

export const ButtonPurple = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
>(function Button(props, ref, ...rest) {
  return (
    <button className={styles.buttonPurple} ref={ref} {...props} {...rest}>
      {props.children}
    </button>
  );
});

export const SquareButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
>(function Button(props, ref, ...rest) {
  return (
    <button className={styles.squareButton} ref={ref} {...props} {...rest}>
      {props.children}
    </button>
  );
});
