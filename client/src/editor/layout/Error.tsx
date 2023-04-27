import React, { useCallback, useEffect, useState } from "react";
import style from "editor/editor.module.scss";
import Icon from "editor/assets/Icon";
import { useError } from "editor/hooks/useError";
const Error = () => {
  const { isError, errMsg, cleanError } = useError();
  const [isOpen, setIsOpen] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const cleanUp = () => {
    cleanError();
    setIsOpen(false);
    setOnHover(false);
  };
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (!onHover) {
      timerId = setTimeout(() => {
        cleanUp();
      }, 5000);
    }
    return () => clearTimeout(timerId);
  }, [onHover]);

  return isError ? (
    <div
      className={style.error_container}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div className={style.error_title} onClick={() => setIsOpen(true)}>
        <Icon type="errorCircle" />
        <div>ERROR: {errMsg.title}</div>
      </div>
      <div className={`${style.content} ${isOpen ? style.open : ""}`}>
        {errMsg.content}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Error;
