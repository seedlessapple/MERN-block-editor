import React from "react";
import style from "../../editor.module.scss";
import Items from "./Items";
import Menu from "../common/Menu";
import Layers from "./Layers";

const Toolbar = () => {
  return (
    <div className={style.toolbar_container}>
      <div className={style.toolbar}>
        <Menu name="레이어">
          <Layers />
        </Menu>
        <Menu name="컴포넌트">
          <Items />
        </Menu>
      </div>
    </div>
  );
};

export default Toolbar;
