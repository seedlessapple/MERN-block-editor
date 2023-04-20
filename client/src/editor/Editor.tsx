import SelectionBox from "./canvas/SelectionBox";
import style from "./editor.module.scss";
import Canvas from "./layout/Canvas";
import Header from "./layout/Header";
import Preview from "./layout/Preview";
import Property from "./layout/Property";
import Settings from "./layout/Settings";
import DragControl from "./layout/controllers/DragControl";
import GlobalEventControl from "./layout/controllers/GlobalEventControl";
import Toolbar from "./layout/toolbar/Toolbar";
import { useEditorState } from "./state/useEditorState";

const Editor = () => {
  const { preview } = useEditorState();
  return (
    <div className={style.editor_container} id={"editorRoot"}>
      {/* Settings */}
      <Settings />
      {/* Header */}
      <Header />
      {/* <SelectionBox /> */}
      <DragControl />
      {/* <GlobalEventControl/> */}
      {!preview.isOpen && (
        <div className={style.editor}>
          {/* main editor */}
          <Canvas />
          {/* toolbar */}
          <Toolbar />
          {/* property control */}
          <Property />
        </div>
      )}
      {/* preview */}
      {preview.isOpen && <Preview />}
    </div>
  );
};

export default Editor;
