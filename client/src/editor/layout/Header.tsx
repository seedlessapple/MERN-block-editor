import React from "react";
import style from "../editor.module.scss";
import { useEditorState } from "editor/state/useEditorState";
import Icon from "editor/assets/Icon";

const Header = () => {
  const { title, data, setSettings } = useEditorState();
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
        <div
          className={style.title}
          onDoubleClick={(e) => {
            e.currentTarget.contentEditable = "true";
          }}
        >
          {title}
        </div>
      </div>
      <div className={style.actions_container}>
        <div
          className={style.save_btn}
          onClick={() => {
            console.log(data);
          }}
        >
          저장
        </div>
        <div className={style.auto_save}>
          <Icon type="cloud" width={18} height={18} />
        </div>
        <div className={style.preview}>
          <Icon
            type="show"
            width={18}
            height={18}
            onClick={() =>
              useEditorState.setState((prev) => ({
                preview: { isOpen: !prev.preview.isOpen },
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
