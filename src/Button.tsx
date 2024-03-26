import React, { PropsWithChildren } from "react";

const Button = function ({
  children,
  ...rest
}: PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>) {
  return (
    <button className="button" {...{ ...rest }}>
      {children}
    </button>
  );
};

export default Button;
