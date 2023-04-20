import { TBlockTableRow } from "editor/types/editor.type";
import React from "react";
import Block from "../Block";

type Props = {
  data: TBlockTableRow;
  path: string[];
  children: JSX.Element[] | JSX.Element;
};
const Cell = ({
  isHeader,
  children,
}: {
  isHeader: boolean;
  children: JSX.Element[] | JSX.Element;
}) => {
  return isHeader ? <th>{children}</th> : <td>{children}</td>;
};
function TableRow({ data, children, path }: Props) {
  
  return (
    <tr>
      {data.data.map((cell) => {
        switch (cell.type) {
          case "block-text":
            return (
              <Cell isHeader={cell.properties?.isHeader ?? false} key={cell.id}>
                <Block.Text
                  data={cell}
                  key={cell.id}
                  path={[...path, cell.id]}
                />
              </Cell>
            );
          default:
            break;
        }
      })}
    </tr>
  );
}

export default TableRow;
