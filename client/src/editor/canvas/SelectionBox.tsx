import React, { useEffect, useLayoutEffect, useState } from "react";
import style from "editor/editor.module.scss";
import { useEditorState } from "editor/state/useEditorState";
type Props = {};

const SelectionBox = (props: Props) => {
  const { current, data } = useEditorState();
  const [selectionBoxData, setSelectionBoxData] = useState<{
    width: string;
    height: string;
    top: number;
    left: number;
  }>({
    width: "",
    height: "",
    top: 0,
    left: 0,
  });
  useLayoutEffect(() => {
    if (current.selected?.[0]) {
      const block = document.getElementById(current.selected?.[0].id);
      block &&
        setSelectionBoxData({
          width: getComputedStyle(block).width,
          height: getComputedStyle(block).height,
          top: block.getBoundingClientRect().top,
          left: block.getBoundingClientRect().left,
        });
    }
  }, [current.selected, current._selectionChangeEvent]);
  return (
    <div
      className={style.selection_box}
      style={{
        width: selectionBoxData.width,
        height: selectionBoxData.height,
        top: selectionBoxData.top,
        left: selectionBoxData.left,
      }}
    ></div>
  );
};

export default SelectionBox;
