import React from "react";
import style from "../../editor.module.scss";
type Props = {
  name: string;
  collapse?: boolean;
  children: JSX.Element | JSX.Element[];
};

const Menu = (props: Props) => {
  return (
    <div
      className={`${style._menu_container} ${props.collapse && style.collapse}`}
    >
      <div className={style._name}>{props.name}</div>
      <div className={`${style._content}`}>{props.children}</div>
    </div>
  );
};

export default Menu;
