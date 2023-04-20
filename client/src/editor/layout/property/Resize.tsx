import React from "react";
import style from "editor/editor.module.scss";
import { useEditorState } from "editor/state/useEditorState";
type Props = {};

const Resize = (props: Props) => {
  const { setBlockProperty, currentBlock } = useEditorState();

  function handleWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (currentBlock) {
      const newWidth =
        value === "100%" ? value : (parseInt(value) || "0").toString();
      setBlockProperty(currentBlock.id, {
        width: newWidth,
      });
    }
  }
  function handleHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (currentBlock) {
      const newHeight =
        value === "100%" ? value : (parseInt(value) || "0").toString();
      setBlockProperty(currentBlock.id, {
        height: newHeight,
      });
    }
  }
  return (
    <div className={style.resize_container}>
      <div className={style.resize_input}>
        <div className={style.input_container}>
          <span className={style.prefix}>W:</span>
          <input
            type="text"
            value={currentBlock?.properties?.width?.toString() ?? "100%"}
            onChange={handleWidthChange}
          />
        </div>
        <div className={style.input_container}>
          <span className={style.prefix}>H:</span>
          <input
            type="text"
            value={currentBlock?.properties?.height?.toString() ?? "100%"}
            onChange={handleHeightChange}
          />
        </div>
      </div>
      <div className={style.resize_select}>
        <select
          name=""
          id=""
          value={
            !currentBlock?.properties?.hasOwnProperty("width") ||
            currentBlock?.properties?.width === "100%"
              ? "fill"
              : "customize"
          }
          onChange={(e) => {
            if (currentBlock) {
              e.target.value === "fill" &&
                setBlockProperty(currentBlock.id, {
                  width: "100%",
                });

              e.target.value === "customize" &&
                setBlockProperty(currentBlock.id, {
                  width: "",
                });
            }
          }}
        >
          <option value="fill">채우기</option>
          <option value="customize">사용자화</option>
        </select>
        <select
          name=""
          id=""
          value={
            !currentBlock?.properties?.hasOwnProperty("height") ||
            currentBlock?.properties?.height === "100%"
              ? "fill"
              : "customize"
          }
          onChange={(e) => {
            if (currentBlock) {
              e.target.value === "fill" &&
                setBlockProperty(currentBlock.id, {
                  height: "100%",
                });

              e.target.value === "customize" &&
                setBlockProperty(currentBlock.id, {
                  height: "",
                });
            }
          }}
        >
          <option value="fill">채우기</option>
          <option value="customize">사용자화</option>
        </select>
      </div>
    </div>
  );
};

export default Resize;
