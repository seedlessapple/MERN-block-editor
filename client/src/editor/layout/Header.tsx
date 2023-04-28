import React from "react";
import style from "../editor.module.scss";
import { useEditorState } from "editor/state/useEditorState";
import Icon from "editor/assets/Icon";
import { useEditorView } from "editor/state/useEditorView";

const Header = () => {
  const { title, data, setTitle, setSettings } = useEditorState();
  const { setView, view } = useEditorView();
  return (
    <div className={style.header_container}>
      <div className={style.controls_container}>
        <div
          className={style.settings_btn}
          onClick={() => {
            setSettings({ isOpen: true });
          }}
        >
          <Icon type="cog" width={18} height={18} />
        </div>
      </div>
      <div className={style.title_container}>
        <input
          id={"titleInput"}
          className={style.title}
          value={title}
          onChange={(e) => {
            e.currentTarget.style.width = `${
              e.target.value.length * 13.82 + 16
            }px`;
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className={style.actions_container}>
        <div
          className={`${style.icon_btn} ${
            view === "canvas" ? style.active : ""
          }`}
        >
          <Icon
            type="edit"
            width={18}
            height={18}
            onClick={() => setView("canvas")}
          />
        </div>
        <div
          className={`${style.icon_btn} ${
            view === "database" ? style.active : ""
          }`}
        >
          <Icon
            type="database"
            width={18}
            height={18}
            onClick={() => setView("database")}
          />
        </div>
        <div
          className={`${style.icon_btn} ${
            view === "preview" ? style.active : ""
          }`}
        >
          <Icon
            type="show"
            width={18}
            height={18}
            onClick={() => setView("preview")}
          />
        </div>
        <div className={`${style.icon_btn} ${style.active}`}>
          <Icon type="cloud" width={18} height={18} />
        </div>
        <div
          className={style.save_btn}
          onClick={() => {
            console.log(data);
          }}
        >
          저장
        </div>
      </div>
    </div>
  );
};

export default Header;
