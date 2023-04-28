import { TBlockText } from "editor/types/editor.type";
import React, { useRef } from "react";
import style from "editor/editor.module.scss";
import { editorBlocksDefaultProperties } from "editor/data/blocks.data";

// interface Style {
//   key: string;
//   tag: string;
//   style: React.CSSProperties;
// }

// const styles: { [key: string]: Style } = {
//   bold: {
//     key: "b",
//     tag: "span",
//     style: { fontWeight: "bold" },
//   },
//   italic: {
//     key: "i",
//     tag: "span",
//     style: { fontStyle: "italic" },
//   },
// };

const StyledText = ({ data }: { data: TBlockText }) => {
  // const [textData] = useState<TStyledTextObjectArray>([
  //   {
  //     text: "adfasd",
  //   },
  //   {
  //     style: {
  //       fontWeight: "600",
  //     },
  //     text: "bold",
  //   },
  //   {
  //     style: {
  //       fontStyle: "italic",
  //     },
  //     text: "italic",
  //   },
  //   {
  //     text: " last",
  //   },
  // ]);
  const contentEditableDiv = useRef<HTMLDivElement>(null);

  function handleInput(event: React.FormEvent<HTMLDivElement>) {
    // console.log(_parseStyledTextHtml(event));
  }
  const applyDefaultStyles = {
    ...editorBlocksDefaultProperties["block-text"],
    ...data.properties,
  };

  const buildStyles = {
    fontSize: applyDefaultStyles.fontSize,
    fontWeight: applyDefaultStyles.fontWeight,
    fontStyle: applyDefaultStyles.fontStyle,
    fontFamily: applyDefaultStyles.fontFamily,
    color: applyDefaultStyles.color,
    backgroundColor: applyDefaultStyles.backgroundColor,
    textAlign: applyDefaultStyles.textAlign,
    padding: applyDefaultStyles.padding,
    borderWidth: applyDefaultStyles.borderWidth,
    borderStyle: applyDefaultStyles.borderStyle,
    borderColor: applyDefaultStyles.borderColor,
  };

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      ref={contentEditableDiv}
      onInput={handleInput}
      onBlur={() => {}}
      className={style.styled_text}
      style={buildStyles}
    >
      {data.text?.map((o, i) => {
        return o.style ? (
          <span key={i} style={o.style}>
            {o.text}
          </span>
        ) : (
          o.text
        );
      })}
    </div>
  );
};

export default StyledText;
