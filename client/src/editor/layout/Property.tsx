import style from "../editor.module.scss";
import React, { useEffect, useState } from "react";
import Menu from "./common/Menu";
import { useEditorState } from "editor/state/useEditorState";
import _ from "lodash";
import ColorPicker from "./property/ColorPicker";
import Resize from "./property/Resize";
import Font from "./property/Font";
import { TPageDataTypes } from "editor/types/editor.type";
import { TBlockProperties, editorBlocks } from "editor/data/blocks.data";
import Align from "./property/Align";
import Icon from "editor/assets/Icon";
import Border from "./property/Border";
import AddProperty from "./property/AddProperty";
import Background from "./property/Background";

const Property = () => {
  const { currentBlock, setBlockProperty } = useEditorState();

  function hasProperty(
    blockType: TPageDataTypes["type"],
    property: TBlockProperties
  ): boolean {
    try {
      return (
        editorBlocks
          .filter((o) => o.type === blockType)[0]
          .properties?.includes(property) ?? false
      );
    } catch {
      return false;
    }
  }

  return (
    <div className={style.property_container}>
      {currentBlock && hasProperty(currentBlock.type, "align") && (
        <Menu name="정렬">
          <div className={style.property}>
            <Align />
          </div>
        </Menu>
      )}
      {currentBlock && (
        <Menu name={currentBlock.type}>
          <div className={style.property}>
            <div>{currentBlock.id}</div>
          </div>
        </Menu>
      )}
      <Menu name="속성">
        <div className={style.property}>
          <AddProperty />
        </div>
      </Menu>
      {currentBlock && hasProperty(currentBlock.type, "size") && (
        <Menu name="사이즈">
          <div className={style.property}>
            <Resize />
          </div>
        </Menu>
      )}
      {currentBlock && hasProperty(currentBlock.type, "text") && (
        <Menu name="텍스트">
          <div className={style.property}>
            <Font />
          </div>
        </Menu>
      )}
      {currentBlock && hasProperty(currentBlock.type, "background") && (
        <Menu name="배경">
          <div className={style.property}>
            <Background />
          </div>
        </Menu>
      )}
      {!currentBlock && (
        <Menu name="페이지">
          <div className={style.property}></div>
        </Menu>
      )}

      {currentBlock && hasProperty(currentBlock.type, "border") && (
        <Menu name="테두리">
          <div className={style.property}>
            <Border />
          </div>
        </Menu>
      )}
    </div>
  );
};

export default Property;
