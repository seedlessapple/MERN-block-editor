import useOutsideClick from "editor/hooks/useOutsideClick";
import React from "react";

type Props = {};

function Select({}: Props) {
  const handleOutSideClick = useOutsideClick();
  return (
    <div ref={handleOutSideClick.RefObject}>
      <input type="text" />
      <div></div>
    </div>
  );
}

export default Select;
