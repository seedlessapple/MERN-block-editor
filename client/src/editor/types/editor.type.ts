import { CSSProperties } from "react";

type TProperty = {
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  fontStyle?: CSSProperties["fontStyle"];
  color?: CSSProperties["color"];
  backgroundColor?: CSSProperties["backgroundColor"];
  fontFamily?: CSSProperties["fontFamily"];
  textAlign?: CSSProperties["textAlign"];
  padding?: CSSProperties["padding"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  borderWidth?: string;
  borderStyle?: CSSProperties["borderStyle"];
  borderColor?: CSSProperties["borderColor"];
  isHeader?: boolean;
  defaultText?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: { value: string; label: string };
  tableHeader?: boolean;
};
/**
 * ------------------------------------------------
 * block
 */
export type TBlock = {
  id: string;
  isHidden?: boolean;
  isLocked?: boolean;
};

export type TBlockText = TBlock & {
  type: "block-text";
  text: TStyledTextObjectArray;
  properties?: TProperty;
};

export type TBlockInput = TBlock & {
  type: "block-input";
  properties?: TProperty;
};

export type TBlockSelect = TBlock & {
  type: "block-select";
  properties?: TProperty;
};

/**
 * ------------------------------------------------
 * block - table
 */
export type TBlockTable = TBlock & {
  type: "block-table";
  properties?: TProperty;
  data: TBlockTableRow[];
};
export type TAllowedCellTypes = TBlockText;
export type TBlockTableRow = TBlock & {
  type: "block-table-row";
  properties?: TProperty;
  data: Array<TAllowedCellTypes>;
};
/**
 * ------------------------------------------------
 *
 */
export type TPage = {
  type: "page";
  id: "page1";
  data: Array<TPageDataTypes>;
};
export type TPageDataTypes =
  | TContainer
  | TBlockText
  | TBlockInput
  | TBlockSelect
  | TBlockTable
  | TBlockTableRow;

export type TContainer = {
  id: string;
  type: "container";
  properties: {
    stack?: "vertical" | "horizontal" | "grid";
    padding?: CSSProperties["padding"];
    margin?: CSSProperties["margin"];
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
  } & TProperty;
  data: TPageDataTypes[];
};
export type TSettings = {
  isOpen: boolean;
  page: {
    pageBreak: boolean;
    layout: "Portrait" | "Landscape";
    pageSize: {
      series: "A" | "B";
      size: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    };
    padding: CSSProperties["padding"];
  };
  defaultStyles?: TProperty;
};

export type TStyledTextObject = {
  text: string;
  style?: TProperty;
};

export type TStyledTextObjectArray = TStyledTextObject[];

type TCurrent = {
  hover?: { id: string; type: string };
  selected?: { id: string; type: string; path: string[] }[];
  _selectionChangeEvent: {};
};
type TDrag = {
  isDragging?: boolean;
  dragElement?: JSX.Element;
  blockType?: TPageDataTypes["type"];
};
export interface IEditorData {
  id: string;
  title: string;
  owner: string;
  created?: string;
  updated?: string;
  archived?: boolean;

  drag: TDrag;

  // ==================== - ====================
  current: TCurrent;
  currentBlock?: TPageDataTypes;
  // ==================== - ====================

  data: TPageDataTypes[];

  // ==================== - ====================
  settings: TSettings;
  preview: {
    isOpen: boolean;
  };
  // ==================== - ====================
}
