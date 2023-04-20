import React from "react";

type Props = {
  type: "Vertical" | "Horizontal" | "Grid";
  children: JSX.Element | JSX.Element[];
};

const Stack = (props: Props) => {
  return <div>{props.children}</div>;
};

export default Stack;
