import React from "react";
import style from "../../editor.module.scss";
import { TBlockInput } from "editor/types/editor.type";

const Input = ({ data }: { data: TBlockInput }) => {
  return (
    <div className={style.input_conatiner}>
      <input type="text" disabled />
    </div>
  );
};

export default Input;
