import Parser from "editor/parser/Parser";
import { useEditorState } from "editor/state/useEditorState";
import React from "react";

function Preview() {
  const data = useEditorState();
  return (
    <div>
      <Parser data={data} />
    </div>
  );
}

export default Preview;
