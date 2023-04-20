import React, { useEffect, useState } from "react";
import style from "../editor.module.scss";
import Container from "editor/canvas/containers/Container";
import Block from "editor/canvas/blocks/Block";
import { useEditorState } from "editor/state/useEditorState";
import { TContainer, TPageDataTypes } from "editor/types/editor.type";
import _ from "lodash";
import SelectionBox from "editor/canvas/SelectionBox";
import Table from "editor/canvas/blocks/table/Table";
import TableRow from "editor/canvas/blocks/table/TableRow";
import StyleMenu from "./StyleMenu";

const mapDataToComponent = (
  data: TPageDataTypes[],
  pathArray: string[]
): JSX.Element[] => {
  return data.map((item) => {
    switch (item.type) {
      case "container":
        return (
          <Container data={item} key={item.id}>
            {mapDataToComponent(item.data, [...pathArray, item.id])}
          </Container>
        );
      case "block-text":
        return (
          <Block.Text
            data={item}
            key={item.id}
            path={[...pathArray, item.id]}
          />
        );
      case "block-input":
        return (
          <Block.Input
            data={item}
            key={item.id}
            path={[...pathArray, item.id]}
          />
        );
      case "block-select":
        return (
          <Block.Select
            data={item}
            key={item.id}
            path={[...pathArray, item.id]}
          />
        );
      case "block-table":
        return (
          <Table data={item} key={item.id} path={[...pathArray, item.id]}>
            {mapDataToComponent(item.data, [...pathArray, item.id])}
          </Table>
        );
      case "block-table-row":
        return (
          <TableRow data={item} key={item.id} path={[...pathArray, item.id]}>
            {/* {mapDataToComponent(item.data, [...pathArray, item.id])} */}
          </TableRow>
        );
      default:
        return <></>;
    }
  });
};

const Canvas = () => {
  const { data, settings, setCurrent } = useEditorState();
  const [renderData, setRenderData] = useState(data);

  // console.log(
  //   PUBLIC_modifyBlockProperties(
  //     data,
  //     ["ukqM1p9G6Zkp"],
  //     { placeholder: "a" }
  //   )
  // );

  useEffect(() => {
    setRenderData(data);
  }, [data]);

  return (
    <div className={style.canvas_container}>
      <StyleMenu />
      <div className={style.canvas}>
        <div
          className={style.page}
          style={{ padding: settings.page.padding }}
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              setCurrent({ selected: [] });
              useEditorState.setState(() => ({ currentBlock: undefined }));
            }
          }}
        >
          {mapDataToComponent(renderData, [])}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
