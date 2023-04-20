import React, { useEffect, useState } from "react";
import Input from "./Input";
import style from "../../editor.module.scss";
import StyledText from "./StyledText";
import { useEditorState } from "editor/state/useEditorState";
import {
  TBlockInput,
  TBlockSelect,
  TBlockText,
} from "editor/types/editor.type";
import _ from "lodash";

const Block = ({
  children,
  data,
  path,
}: {
  children: JSX.Element;
  data: any;
  path: string[];
}) => {
  const { setCurrent, current, setCurrentBlock } = useEditorState();
  const [dragover, setDragover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(_.findIndex(current.selected, { id: data.id }) !== -1);
  }, [current.selected, data.id]);
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
      className={`${style.block} ${dragover ? style.dragover : ""} ${
        isSelected ? style.selected : ""
      }`}
      style={buildSize()}
      id={data.id}
      draggable="false"
      onMouseEnter={() =>
        setCurrent({ hover: { id: data.id, type: data.type } })
      }
      onDragOver={(e) => {
        e.preventDefault();
        console.log(e);

        setDragover(true);
      }}
      onDragLeave={(e) => {
        console.log("leave");
        // e.currentTarget.classList.remove(style.dragover);
        setDragover(false);
      }}
      onDrop={(e) => {
        // e.currentTarget.classList.remove(style.dragover);
        console.log(e.dataTransfer.getData("blockType"));
        setDragover(false);
      }}
      onClick={(e) => {
        setCurrent({
          selected: [{ id: data.id, type: data.type, path: path }],
        });
        setCurrentBlock(data);
      }}
    >
      {children}
    </div>
  );
};

Block.Text = ({ data, path }: { data: TBlockText; path: string[] }) => {
  return (
    <Block data={data} path={path}>
      <StyledText data={data} />
    </Block>
  );
};
Block.Input = ({ data, path }: { data: TBlockInput; path: string[] }) => {
  return (
    <Block data={data} path={path}>
      <Input data={data} />
    </Block>
  );
};
Block.Select = ({ data, path }: { data: TBlockSelect; path: string[] }) => {
  return (
    <Block data={data} path={path}>
      <div></div>
      {/* <Input data={data} /> */}
    </Block>
  );
};

export default Block;
