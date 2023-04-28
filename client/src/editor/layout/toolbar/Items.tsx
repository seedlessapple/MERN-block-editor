import React, { useCallback, useEffect, useState } from "react";
import style from "../../editor.module.scss";
import { editorBlocks, editorBlocksCategory } from "editor/data/blocks.data";
import Icon from "editor/assets/Icon";
import { PUBLIC_disassembleKorean } from "editor/functions/functions";
import { useEditorState } from "editor/state/useEditorState";

// import Icon from "editor/assets/Icon";
const Category = ({
  children,
  label,
  isSearching,
}: {
  children?: JSX.Element | JSX.Element[];
  label: string;
  isSearching: boolean;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isSearching);
  }, [isSearching]);

  return (
    <div className={style.category}>
      <div className={style.header} onClick={() => setOpen((prev) => !prev)}>
        <Icon
          type="arrowDown"
          width={"8px"}
          height={"8px"}
          rotate={open ? 180 : 90}
          fill="#bababa"
        />
        {label}
      </div>
      <div className={style.content}>{open && children}</div>
    </div>
  );
};
const Items = () => {
  const [searchParam, setSearchParam] = useState<string>("");
  const { setDrag } = useEditorState();
  const filteredData = useCallback(() => {
    return editorBlocks.filter(
      (o) =>
        PUBLIC_disassembleKorean(o.label).includes(
          PUBLIC_disassembleKorean(searchParam)
        ) || o.label.toLowerCase().includes(searchParam.toLowerCase())
    );
  }, [searchParam]);

  return (
    <div className={style.item_list_container}>
      {/* get the items */}
      <div className={style.search_container}>
        <input
          type="text"
          className={style.search}
          placeholder="검색"
          value={searchParam}
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
        />
      </div>
      <div className={style.category_container}>
        {editorBlocksCategory.map((category) => {
          return (
            <Category
              label={category}
              key={category}
              isSearching={!!searchParam}
            >
              {filteredData()
                .filter((o) => o.category === category)
                .map((item) => {
                  return (
                    <div
                      key={item.label}
                      className={style.item}
                      onMouseDown={(e) => {
                        setDrag({
                          isDragging: true,
                          blockType: item.type,
                          dragElement: (
                            <div
                              style={{
                                fontWeight: "400",
                                color: "#353535",
                                fontSize: "12px",
                                height: "28px",
                                display: "flex",
                                gap: "6px",
                                alignItems: "center",
                              }}
                            >
                              <Icon
                                type={item.icon}
                                width={"12px"}
                                height={"12px"}
                              />
                              <span>{item.label}</span>
                            </div>
                          ),
                        });
                      }}
                      onMouseUp={() =>
                        setDrag({
                          isDragging: false,
                        })
                      }
                    >
                      {/* <Icon type={item.icon} /> */}
                      <Icon type={item.icon} width={"12px"} height={"12px"} />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
            </Category>
          );
        })}
      </div>
    </div>
  );
};

export default Items;
