import { useAlert } from "editor/hooks/useAlert";
import React, { useEffect, useRef, useState } from "react";
import style from "editor/editor.module.scss";
import Icon from "editor/assets/Icon";
type Props = {};

const Alert = (props: Props) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isAlert,
    alertType,
    alertMsg,
    cleanAlert,
    callbackFunction,
    alertStyle,
  } = useAlert();
  const isBtnDisabled =
    isLoading ||
    (alertStyle.inputNotEmpty && inputValue === "") ||
    (alertStyle.inputMatch !== "" &&
      inputValue !== alertStyle.inputMatch);

  useEffect(() => {
    function handleMousedown(e: MouseEvent) {
      if (alertRef.current && !alertRef.current.contains(e.target as Node)) {
        if (!isLoading) {
          cleanAlert();
          setInputValue("");
          setIsLoading(false);
        }
      }
    }
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, [cleanAlert, callbackFunction, isLoading]);

  return isAlert ? (
    <div
      className={style.alert_container}
      data-type={alertType}
      style={{ alignItems: alertStyle.align }}
    >
      <div className={style.alert} ref={alertRef}>
        <div className={style.content}>
          {alertMsg}

          {alertStyle.input && (
            <input
              type="text"
              value={inputValue}
              className={style.input}
              placeholder={alertStyle.inputPlaceholder}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
        </div>
        <div className={style.btn_container}>
          {!!alertStyle.btn_1 && (
            <button
              className={style.btn}
              disabled={isBtnDisabled}
              onClick={async () => {
                if (!isBtnDisabled) {
                  setIsLoading(true);
                  await callbackFunction(false, inputValue);
                  cleanAlert();
                  setInputValue("");
                  setIsLoading(false);
                }
              }}
            >
              {alertStyle.btn_1}
            </button>
          )}
          {!!alertStyle.btn_2 && (
            <button
              className={style.btn}
              disabled={isBtnDisabled}
              onClick={async () => {
                if (!isBtnDisabled) {
                  setIsLoading(true);
                  await callbackFunction(true, inputValue);
                  cleanAlert();
                  setInputValue("");
                  setIsLoading(false);
                }
              }}
            >
              {isLoading ? (
                <Icon type="loading" className={style.loader} />
              ) : (
                alertStyle.btn_2
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Alert;
