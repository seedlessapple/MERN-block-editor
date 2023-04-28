import React, { useCallback, useEffect, useState } from "react";
import style from "editor/editor.module.scss";
import Icon from "editor/assets/Icon";
import { useEditorState } from "editor/state/useEditorState";
import { TPageDataTypes } from "editor/types/editor.type";
import { TIcons } from "editor/assets/icons.data";
import _, { divide } from "lodash";
import {
  createBlockByType,
  editorBlocks,
  findBlockDataByType,
} from "editor/data/blocks.data";
import { useAlert } from "editor/hooks/useAlert";
import { PUBLIC_generateRandomId } from "editor/functions/functions";
import { useError } from "editor/hooks/useError";
type Props = {};
const LayerItem = ({
  data,
  name,
  depths,
  path,
  children,
  icon,
}: {
  data: TPageDataTypes;
  name: string;
  depths: number;
  path: string[];
  icon?: TIcons;
  children?: JSX.Element | JSX.Element[] | undefined;
}) => {
  const { raiseError } = useError();
  const [open, setOpen] = useState<Boolean>(true);
  const [show, setShow] = useState<Boolean>(true);
  const [locked, setLocked] = useState<Boolean>(false);
  const [isAddRowDragover, setIsAddRowDragover] = useState<boolean>(false);
  const {
    current,
    setCurrent,
    setCurrentBlock,
    drag,
    addBlockAfter,
    addBlockInside,
  } = useEditorState();
  const [layerState, setLayerState] = useState({
    isHovering: false,
  });
  const [componentState, setComponentState] = useState({
    isHovering: false,
    isSelected: false,
  });
  const canOpen =
    data.type === "container" ||
    data.type === "block-table" ||
    data.type === "block-table-row";

  useEffect(() => {
    setComponentState({
      isHovering: current.hover?.id === data.id,
      isSelected: _.findIndex(current.selected, { id: data.id }) !== -1,
    });
  }, [current, data.id]);

  return (
    <>
      <div
        className={`${style.layer_item} ${
          drag.isDragging && layerState.isHovering ? style.dragover : ""
        }${drag.isDragging && isAddRowDragover ? style.add_row_draggover : ""}`}
      >
        <div
          className={`${style.header} ${
            !drag.isDragging && componentState.isHovering ? style.hover : ""
          } ${componentState.isSelected ? style.selected : ""} ${
            drag.isDragging && layerState.isHovering ? style.dragover : ""
          }`}
          onMouseEnter={() => {
            setCurrent({ hover: { id: data.id, type: data.type } });
            setLayerState((prev) => ({ ...prev, isHovering: true }));
          }}
          onMouseLeave={() =>
            setLayerState((prev) => ({ ...prev, isHovering: false }))
          }
          onMouseUp={() => {
            if (drag.isDragging && drag.blockType) {
              //  drop
              addBlockAfter(data.id, createBlockByType(drag.blockType));
            }
          }}
          onClick={() => {
            setCurrent({
              selected: [{ id: data.id, type: data.type, path: path }],
            });
            setCurrentBlock(data);
          }}
        >
          {canOpen ? (
            <Icon
              onClick={() => {
                children && setOpen((prev) => !prev);
              }}
              type="arrowDown"
              width={"8px"}
              height={"8px"}
              rotate={open ? 180 : 90}
              fill="#555"
              style={{ marginLeft: `${depths * 4}px` }}
            />
          ) : (
            <Icon
              width={"12px"}
              height={"12px"}
              style={{ marginLeft: `${depths * 4}px` }}
              type={icon as TIcons}
            />
          )}
          <div className={style.name}>{name}</div>

          <div className={style.controls}>
            {
              <div
                className={style.icon}
                onClick={() => {
                  setShow((prev) => !prev);
                }}
              >
                {show ? (
                  layerState.isHovering && <Icon type={"show"} fill="#666" />
                ) : (
                  <Icon type={"hide"} fill="#666" />
                )}
              </div>
            }
            <div
              className={style.icon}
              onClick={() => {
                setLocked((prev) => !prev);
              }}
            >
              {locked ? (
                <Icon type={"lock"} fill="#666" />
              ) : (
                layerState.isHovering && <Icon type={"lockOpen"} fill="#666" />
              )}
            </div>
          </div>
        </div>
        {canOpen && open && (
          <div
            onMouseEnter={() => drag.isDragging && setIsAddRowDragover(true)}
            onMouseLeave={() => setIsAddRowDragover(false)}
            onMouseUp={() => {
              if (drag.isDragging && isAddRowDragover && drag.blockType) {
                //  drop
                if (
                  findBlockDataByType(data.type)?.validDropType?.includes(
                    drag.blockType
                  )
                ) {
                  console.log(drag.blockType);

                  addBlockInside(data.id, createBlockByType(drag.blockType));
                } else {
                  raiseError({
                    title: `${
                      findBlockDataByType(drag.blockType)?.label
                    }는 ${findBlockDataByType(drag.blockType)?.label}에 바로 추가할 수 없습니다`,
                    content: "",
                  });
                }
              }
            }}
            className={`${style.add_row} ${
              drag.isDragging && isAddRowDragover ? style.dragover : ""
            }`}
          ></div>
        )}

        {open && canOpen && <div className={style.content}>{children}</div>}
      </div>
    </>
  );
};
const mapLayers = (
  data: TPageDataTypes[],
  pathArray: Array<string>
): JSX.Element[] => {
  const depths = pathArray.length;

  return data?.map((item) => {
    switch (item.type) {
      case "container":
        return (
          <LayerItem
            data={item}
            name="컨테이너"
            key={item.id}
            depths={depths}
            path={[...pathArray, item.id]}
          >
            {mapLayers(item.data, [...pathArray, item.id])}
          </LayerItem>
        );
      case "block-text":
        return (
          <LayerItem
            name="텍스트"
            data={item}
            key={item.id}
            icon={editorBlocks.filter((o) => o.type === item.type)[0].icon}
            depths={depths}
            path={[...pathArray, item.id]}
          />
        );
      case "block-input":
        return (
          <LayerItem
            name="입력"
            data={item}
            key={item.id}
            icon={editorBlocks.filter((o) => o.type === item.type)[0].icon}
            depths={depths}
            path={[...pathArray, item.id]}
          />
        );
      case "block-select":
        return (
          <LayerItem
            name="선택"
            data={item}
            key={item.id}
            icon={editorBlocks.filter((o) => o.type === item.type)[0].icon}
            depths={depths}
            path={[...pathArray, item.id]}
          />
        );
      case "block-table":
        return (
          <LayerItem
            name="테이블"
            data={item}
            key={item.id}
            depths={depths}
            path={[...pathArray, item.id]}
          >
            {mapLayers(item.data, [...pathArray, item.id])}
          </LayerItem>
        );
      case "block-table-row":
        return (
          <LayerItem
            name="열"
            data={item}
            key={item.id}
            depths={depths}
            path={[...pathArray, item.id]}
          >
            {mapLayers(item.data, [...pathArray, item.id])}
          </LayerItem>
        );

      default:
        return <></>;
    }
  });
};

const Layers = (props: Props) => {
  const { data, drag, setData } = useEditorState();
  const { raiseError } = useError();
  const [isAddToPageDragover, setIsAddToPageDragover] =
    useState<boolean>(false);

  return (
    <div className={style.layer_container}>
      <div
        onMouseEnter={() => drag.isDragging && setIsAddToPageDragover(true)}
        onMouseLeave={() => setIsAddToPageDragover(false)}
        className={`${style.add_to_page} ${
          drag.isDragging && isAddToPageDragover ? style.dragover : ""
        }`}
        onMouseUp={() => {
          if (drag.isDragging && drag.blockType) {
            if (
              findBlockDataByType("container")?.validDropType?.includes(
                drag.blockType
              )
            ) {
              useEditorState.setState((prev) => ({
                data: [
                  createBlockByType(drag.blockType ?? "block-text"),
                  ...prev.data,
                ],
              }));
            } else {
              raiseError({
                title: `${
                  findBlockDataByType(drag.blockType)?.label
                }는 페이지에 바로 추가할 수 없습니다`,
                content: "",
              });
            }
          }
        }}
        style={{ height: data.length === 0 ? "100%" : "" }}
      ></div>
      {mapLayers(data, [])}
    </div>
  );
};

export default Layers;
