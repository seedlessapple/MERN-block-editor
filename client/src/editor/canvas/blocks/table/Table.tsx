import React, { useEffect, useRef, useState } from "react";
import style from "editor/editor.module.scss";
import { TBlockTable } from "editor/types/editor.type";
import TableRow from "./TableRow";

type Props = {
  data: TBlockTable;
  path: string[];
  children: JSX.Element[] | JSX.Element;
};

const Table = (props: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [widthArray, setWidthArray] = useState([100 / 3, 100 / 3, 100 / 3]);
  const [mouseDown, setMouseDown] = useState(false);

  //   function handleMouseUp() {
  //     setMouseDown(false);
  //   }
  //   useEffect(() => {
  //     window.addEventListener("mouseup", handleMouseUp);
  //     return () => {
  //       window.removeEventListener("mouseup", handleMouseUp);
  //     };
  //   }, []);

  return (
    <div className={style.table_container}>
      <table className={style.table} ref={tableRef}>
        <colgroup>
        </colgroup>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

// dev
const ResizeHandle = ({
  onResize,
  onMouseDown,
}: {
  onResize: (width: any) => void;
  //   onResize: (width: number) => void;
  onMouseDown: () => void;
}) => {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const width = event;
    onResize(width);
  };

  return (
    <div
      className={style.resize_handle}
      onMouseMove={handleMouseMove}
      onMouseDown={onMouseDown}
    ></div>
  );
};

export default Table;
