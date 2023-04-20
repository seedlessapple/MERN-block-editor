import { TIcons } from "editor/assets/icons.data";
import {
  TBlockInput,
  TBlockSelect,
  TBlockText,
  TContainer,
  TPageDataTypes,
} from "editor/types/editor.type";
import { CSSProperties } from "react";
export const editorBlocksCategory = [
  "컨테이너",
  "일반",
  "폼",
  "데이터",
] as const;
export type TBlockProperties =
  | "align"
  | "stack"
  | "placeholder"
  | "background"
  | "size"
  | "text"
  | "border";
type TEditorBlocksData = {
  label: string;
  icon: TIcons;
  type?: TPageDataTypes["type"];
  category: typeof editorBlocksCategory[number];
  properties?: TBlockProperties[];
}[];

export const editorBlocks: TEditorBlocksData = [
  {
    label: "컨테이너",
    icon: "folder",
    type: "container",
    category: "컨테이너",
    properties: ["size", "stack", "align", "border", "background"],
  },
  {
    label: "텍스트",
    icon: "text",
    type: "block-text",
    category: "일반",
    properties: ["size", "text", "border", "background"],
  },
  {
    label: "입력",
    icon: "input",
    type: "block-input",
    category: "폼",
    properties: ["border", "size", "placeholder", "background"],
  },
  {
    label: "Textarea",
    icon: "text",
    category: "폼",
    properties: ["size", "placeholder", "background"],
  },
  {
    label: "Select",
    icon: "rectangle",
    type: "block-select",
    category: "폼",
    properties: ["size", "background"],
  },
  {
    label: "테이블",
    icon: "table",
    type: "block-table",
    category: "일반",
    properties: ["size", "background"],
  },
  {
    label: "Autofill",
    icon: "rectangle",
    category: "폼",
    properties: ["size", "placeholder", "background"],
  },
  {
    label: "DatePicker",
    icon: "rectangle",
    category: "폼",
    properties: ["size"],
  },
  {
    label: "체크박스",
    icon: "squareChecked",
    category: "폼",
    properties: ["size"],
  },
  {
    label: "스위치",
    icon: "rectangle",
    category: "폼",
    properties: ["size"],
  },
  {
    label: "Radio",
    icon: "rectangle",
    category: "폼",
    properties: ["size"],
  },
  {
    label: "Button",
    icon: "rectangle",
    category: "폼",
    properties: ["size"],
  },
  {
    label: "파일업로드",
    icon: "file",
    category: "데이터",
    properties: ["size"],
  },
  {
    label: "Divider",
    icon: "rectangle",
    category: "폼",
    properties: ["size"],
  },
];
type TEditorBlocksProperties = {
  container: (keyof TContainer["properties"])[];
  "block-text": (keyof TBlockText["properties"])[];
  "block-input": (keyof TBlockInput["properties"])[];
  "block-select": (keyof TBlockSelect["properties"])[];
};

export const editorBlocksProperties: TEditorBlocksProperties = {
  container: ["stack", "margin", "padding"],
  "block-text": [],
  "block-input": [],
  "block-select": [],
};

type TEditorBlocksDefaultProperties = {
  container: TContainer["properties"];
  "block-text": TBlockText["properties"];
  "block-input": TBlockInput["properties"];
  "block-select": TBlockSelect["properties"];
};

export const editorBlocksDefaultProperties: TEditorBlocksDefaultProperties = {
  container: {
    stack: "vertical",
  },
  "block-text": {
    width: "100%",
    height: "100%",
    fontSize: "12px",
    fontWeight: 400,
    fontFamily: "inherit",
    fontStyle: "normal",
    textAlign: "left",
    color: "black",
    backgroundColor: "transparent",
    padding: "8px 12px",
    borderWidth: "0px",
    borderStyle: "solid",
    borderColor: "none",
  },
  "block-input": {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    padding: "8px 10px",
    borderWidth: "0px",
    borderStyle: "solid",
    borderColor: "none",
    // borderRadius: "4px",
  },
  "block-select": {},
};
