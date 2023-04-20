import { useEditorState } from "editor/state/useEditorState";
import React, { useEffect, useRef, useState } from "react";
import style from "editor/editor.module.scss";
type Props = {};

const DragControl = (props: Props) => {
  const { drag, setDrag } = useEditorState();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const dragControlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseUp() {
      setDrag({ isDragging: false });
    }
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (drag?.isDragging && dragControlRef.current) {
        const div = dragControlRef.current;
        if (event.pageY > 48) div.style.top = event.pageY + "px";
        div.style.left = event.pageX + 4 + "px";

        const root = document.getElementById("editorRoot");
        if (root) root.style.cursor = "grabbing";
      }
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      const root = document.getElementById("editorRoot");
      if (root) root.style.cursor = "";
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [drag?.isDragging]);

  return drag?.isDragging ? (
    <div className={style.drag_control} ref={dragControlRef}>
      {drag.dragElement}
    </div>
  ) : (
    <></>
  );
};

export default DragControl;
