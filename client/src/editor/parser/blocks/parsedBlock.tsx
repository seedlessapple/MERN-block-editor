import StyledText from "editor/canvas/blocks/StyledText";
import {
  TBlockInput,
  TBlockSelect,
  TBlockText,
} from "editor/types/editor.type";
import React from "react";
import style from "editor/editor.module.scss";
import Text from "./Text";
import Input from "./Input";

type Props = {};
const ParsedBlock = ({
  children,
  data,
  path,
}: {
  children: JSX.Element;
  data: any;
  path: string[];
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
      className={style.block}
      style={buildSize()}
      id={data.id}
      draggable="false"
    >
      {children}
    </div>
  );
};
ParsedBlock.Text = ({ data, path }: { data: TBlockText; path: string[] }) => {
  return (
    <ParsedBlock data={data} path={path}>
      <Text />
    </ParsedBlock>
  );
};
ParsedBlock.Input = ({ data, path }: { data: TBlockInput; path: string[] }) => {
  return (
    <ParsedBlock data={data} path={path}>
      <Input data={data} />
    </ParsedBlock>
  );
};

ParsedBlock.Select = ({
  data,
  path,
}: {
  data: TBlockSelect;
  path: string[];
}) => {
  return (
    <ParsedBlock data={data} path={path}>
      <div></div>
    </ParsedBlock>
  );
};

export default ParsedBlock;
