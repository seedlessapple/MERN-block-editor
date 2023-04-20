import React, { CSSProperties } from "react";
import { iconsData } from "./icons.data";

type Props = {
  type: keyof typeof iconsData;
  style?: CSSProperties;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  fill?: CSSProperties["fill"];
  rotate?: number;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  cursor?: CSSProperties["cursor"];
};

const Icon = (props: Props) => {
  return (
    <svg
      onClick={props.onClick && props.onClick}
      shapeRendering={"auto"}
      fill={props.fill}
      transform={props.rotate ? `rotate(${props.rotate})` : undefined}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "16"}
      height={props.height ?? "16"}
      style={props.style}
      viewBox="0 0 24 24"
      cursor={props.cursor && props.cursor}
    >
    {iconsData[props.type]}
    </svg>
  );
};

export default Icon;
