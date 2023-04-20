import React, { useRef } from "react";
import style from "editor/editor.module.scss";
import { TBlockTable } from "editor/types/editor.type";

type Props = {
  data: TBlockTable;
  path: string[];
  children: JSX.Element[] | JSX.Element;
};

const Table = (props: Props) => {
  return (
    <div className={style.table_container}>
      <table className={style.table}>
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export default Table;
