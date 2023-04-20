import Container from "editor/canvas/containers/Container";
import { IEditorData, TPageDataTypes } from "editor/types/editor.type";
import React from "react";
import style from "editor/editor.module.scss";
import ParsedBlock from "./blocks/parsedBlock";
import Table from "./blocks/Table";
import TableRow from "./blocks/TableRow";
type Props = {
  data: IEditorData;
};

const Parser = (props: Props) => {
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
            <ParsedBlock.Text
              data={item}
              key={item.id}
              path={[...pathArray, item.id]}
            />
          );
        case "block-input":
          return (
            <ParsedBlock.Input
              data={item}
              key={item.id}
              path={[...pathArray, item.id]}
            />
          );
        case "block-select":
          return (
            <ParsedBlock.Select
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
  return (
    <div
      className={style.parser}
      style={{ padding: props.data.settings.page.padding }}
    >
      {mapDataToComponent(props.data.data, [])}
    </div>
  );
};

export default Parser;
