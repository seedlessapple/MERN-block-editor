import React, { useEffect, useState } from "react";

type Props = {};

const StyleMenu = (props: Props) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    function handleSelectionChange(event: Event) {
      const selection = document.getSelection();
      if (selection && !selection?.isCollapsed) {
        const range = selection.getRangeAt(0);
        console.log(range.getBoundingClientRect());
      }
    }
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return isShow ? <div>StyleMenu</div> : <></>;
};

export default StyleMenu;
