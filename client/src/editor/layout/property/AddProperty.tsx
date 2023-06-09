import React from "react";
import style from "editor/editor.module.scss";
import { useEditorState } from "editor/state/useEditorState";
type Props = {};

const AddProperty = (props: Props) => {
  const { currentBlock } = useEditorState();
  return currentBlock ? (
    <div className={style.add_property_container}>
      {/* <label className="name">data</label> */}
      <div className={style.item_container}></div>

      <div
        className={style.add_btn}
        onClick={() => {
        }}
      >
        추가
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AddProperty;
