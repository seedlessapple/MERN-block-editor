import React from "react";
import style from "editor/editor.module.scss";
import Icon from "editor/assets/Icon";
type Props = {};

const Align = (props: Props) => {
  return (
    <div className={style.align_container}>
      <Icon width={20} height={20} cursor="pointer" type="objectHorizontalLeft" />
      <Icon width={20} height={20} cursor="pointer" type="objectHorizontalCenter" />
      <Icon width={20} height={20} cursor="pointer" type="objectHorizontalRight" />
      <Icon width={20} height={20} cursor="pointer" type="objectVerticalBottom" />
      <Icon width={20} height={20} cursor="pointer" type="objectVerticalCenter" />
      <Icon width={20} height={20} cursor="pointer" type="objectVerticalTop" />
      <div style={{flex:"1 1 0"}}></div>
      <select name="" id=""></select>
    </div>
  );
};

export default Align;
