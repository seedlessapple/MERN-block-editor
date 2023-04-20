import Icon from "editor/assets/Icon";
import React from "react";
import style from "editor/editor.module.scss";
import ColorPicker from "./ColorPicker";
import { useEditorState } from "editor/state/useEditorState";

function Border() {
  const { setBlockProperty, currentBlock } = useEditorState();

  return currentBlock ? (
    <div className={style.border_container}>
      <div className={style.border}>
        <div className={style.border_size}>
          <Icon type="stroke" style={{ marginLeft: "4px" }} />
          <input
            type="number"
            value={parseInt(
              currentBlock.properties?.borderWidth?.toString() || "0"
            )}
            onChange={(e) => {
              setBlockProperty(currentBlock.id, {
                borderWidth: e.target.value + "px",
              });
            }}
          />
        </div>
        <div className={style.border_radius}>
          <Icon type="borderRound" style={{ marginLeft: "4px" }} />
          <input type="number" />
        </div>
      </div>
      <ColorPicker
        onChange={(value) => {
          setBlockProperty(currentBlock.id, { borderColor: value });
        }}
        value={currentBlock.properties?.borderColor}
      />
    </div>
  ) : (
    <></>
  );
}

export default Border;
