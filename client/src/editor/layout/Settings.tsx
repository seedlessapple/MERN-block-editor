import React, { useEffect, useRef } from "react";
import style from "editor/editor.module.scss";
import { useEditorState } from "editor/state/useEditorState";
import Icon from "editor/assets/Icon";
type Props = {};

const Container = ({
  children,
  name,
}: {
  children?: JSX.Element | JSX.Element[];
  name: string;
}) => {
  return (
    <div className={style.settings_item_container}>
      <div className={style.name}>{name}</div>
      <div className={style.content}>{children}</div>
    </div>
  );
};
const Settings = (props: Props) => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const { settings, setSettings } = useEditorState();

  /**
   * adding eventlistener on componentDidMount, and removing the eventlistener on component­Will­Unmount
   */
  useEffect(() => {
    function handleMousedown(e: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setSettings({ isOpen: false });
      }
    }
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, [setSettings]);

  return settings.isOpen ? (
    <div className={style.settings_container}>
      <div ref={settingsRef} className={style.settings}>
        <div className={style.title_container}>
          <div>설정</div>
          <Icon
            onClick={() => setSettings({ isOpen: false })}
            width={24}
            height={24}
            cursor="pointer"
            type="x"
          />
        </div>
        <Container name="페이지 설정">
          <div className={style.item_container}>
            <select name="" id=""></select>
          </div>
        </Container>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Settings;
