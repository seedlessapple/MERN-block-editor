import { create } from "zustand";
import {
  IEditorData,
  TContainer,
  TPageDataTypes,
  TSettings,
} from "editor/types/editor.type";
import {
  _EDITOR_addBlockAfter,
  _EDITOR_modifyBlockProperties,
} from "editor/functions/editorFunctions";

const dummyContent: TContainer[] = [
  {
    type: "container",
    id: "ukqM1p9G6Zkp",
    properties: {
      stack: "vertical",
    },
    data: [
      {
        id: "uZd0gXzPkJx8",
        type: "block-text",
        text: [],
      },
      {
        id: "akGU9oBBq7vk",
        type: "block-input",
      },
      {
        type: "container",
        id: "HnnUYbNUjUhQ",
        properties: {
          stack: "vertical",
        },
        data: [
          {
            type: "container",
            id: "SBNHuut8ruW5",
            properties: {
              stack: "horizontal",
            },
            data: [
              {
                id: "l9O9jzwRVQ72",
                type: "block-text",
                text: [],
              },
              {
                id: "KBMl5Ln5Gp3v",
                type: "block-input",
                properties: {
                  required: true,
                  placeholder: "input",
                  defaultText: "input a value",
                },
              },
              {
                id: "H7dAFJWXtXpA",
                type: "block-input",
              },
              {
                id: "KtoQJNmCWtdS",
                type: "block-input",
              },
            ],
          },
        ],
      },
      {
        id: "qewe23jkqwef",
        type: "block-table",
        data: [
          {
            id: "qewe23jkqwefriw",
            type: "block-table-row",
            data: [
              {
                id: "qejasdkqawef",
                type: "block-text",
                text: [],
              },
              {
                id: "qejadsdkqwef",
                type: "block-text",
                text: [],
              },
              {
                id: "qejasds1kqwef",
                type: "block-text",
                text: [],
              },
            ],
          },
          {
            id: "qewe23jkqw1efriw",
            type: "block-table-row",
            data: [
              {
                id: "qej1asdkqawef",
                type: "block-text",
                text: [],
              },
              {
                id: "qe1jadsdkqwef",
                type: "block-text",
                text: [],
              },
              {
                id: "q1ejasds1kqwef",
                type: "block-text",
                text: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

interface IEditorStateSetFunctions {
  // selected: string[];
  // set functions

  setSettings: (by: Partial<TSettings>) => void;
  setData: (by: TContainer[]) => void;

  setCurrent: (by: Partial<IEditorData["current"]>) => void;
  setCurrentBlock: (by: TPageDataTypes) => void;
  setDrag: (by: Partial<IEditorData["drag"]>) => void;
  setPreview: (by: Partial<IEditorData["preview"]>) => void;
  setBlockProperty: (
    blockId: string,
    properties: TPageDataTypes["properties"]
  ) => void;
  addBlockAfter: (blockId: string, type: TPageDataTypes["type"]) => void;
}

export const useEditorState = create<IEditorData & IEditorStateSetFunctions>()(
  (set) => ({
    id: "",
    title: "제목없음",
    owner: "",
    drag: {
      isDragging: false,
      blockType: undefined,
    },
    current: {
      hover: undefined,
      selected: [],
      _selectionChangeEvent: {},
    },
    data: dummyContent,
    preview: { isOpen: false },
    settings: {
      isOpen: false,
      page: {
        pageBreak: false,
        layout: "Portrait",
        pageSize: {
          series: "A",
          size: 4,
        },
        padding: "12px 12px 12px 12px",
      },
      defaultStyles: {},
    },

    setSettings: (by) =>
      set((state) => ({
        ...state,
        settings: {
          ...state.settings,
          ...by,
        },
      })),
    setData: (by) =>
      set((state) => ({
        ...state,
        data: by,
      })),
    setBlockProperty: (blockId, properties) =>
      set((state) => {
        const { result, CBlock } = _EDITOR_modifyBlockProperties(
          state.data,
          blockId,
          properties
        );
        return {
          ...state,
          data: result,
          currentBlock: CBlock,
        };
      }),
    setCurrent: (by) =>
      set((state) => ({
        ...state,
        current: {
          ...state.current,
          ...by,
        },
      })),
    setCurrentBlock: (by) =>
      set((state) => ({
        ...state,
        currentBlock: by,
      })),
    setDrag: (by) =>
      set((state) => ({
        ...state,
        drag: {
          ...state.drag,
          ...by,
        },
      })),
    setPreview: (by) =>
      set((state) => ({
        ...state,
        preview: {
          ...state.preview,
          ...by,
        },
      })),
    addBlockAfter: (blockId, type) =>
      set((state) => {
        const { result, NBlock } = _EDITOR_addBlockAfter(
          state.data,
          blockId,
          type
        );
        return {
          ...state,
          data: result,
          // currentBlock: CBlock,
        };
      }),
    //   increase: (by) => set((state) => ({ bears: state.bears + by })),
  })
);
