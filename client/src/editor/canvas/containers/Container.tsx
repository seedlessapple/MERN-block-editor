import React from "react";
import style from "../../editor.module.scss";
import { TContainer } from "editor/types/editor.type";
const Container = ({
  children,
  data,
}: {
  children?: JSX.Element | JSX.Element[];
  data: TContainer;
}) => {
  const buildSize = () => {
    let style: any = {};
    if (data.properties?.width !== "100%") {
      style.width = "100%";
      style.maxWidth = data.properties?.width + "px";
    }
    if (data.properties?.height !== "100%") {
      style.height = data.properties?.height + "px";
      style.minHeight = data.properties?.height + "px";
    }
    return style;
  };
  return (
    <div
      data-stack={data.properties.stack}
      style={buildSize()}
      className={style[`block_container_${data.properties.stack ?? ""}`]}
    >
      {children}
    </div>
  );
};

export default Container;
