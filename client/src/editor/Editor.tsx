import SelectionBox from "./canvas/SelectionBox";
import Database from "./database/Database";
import style from "./editor.module.scss";
import Alert from "./layout/Alert";
import Canvas from "./layout/Canvas";
import Error from "./layout/Error";
import Header from "./layout/Header";
import Preview from "./layout/Preview";
import Property from "./layout/Property";
import Settings from "./layout/Settings";
import DragControl from "./layout/controllers/DragControl";
import GlobalEventControl from "./layout/controllers/GlobalEventControl";
import Toolbar from "./layout/toolbar/Toolbar";
import { useEditorView } from "./state/useEditorView";

const Editor = () => {
  const { view } = useEditorView();
  return (
    <div className={style.editor_container} id={"editorRoot"}>
      {/* Events */}
      <GlobalEventControl />
      {/* Settings */}
      <Settings />
      {/* Alert */}
      <Alert />
      {/* Error */}
      <Error />
      {/* Header */}
      <Header />
      {/* <SelectionBox /> */}
      <DragControl />
      {view === "canvas" && (
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
      {view === "preview" && <Preview />}
      {/* Database */}
      {view === "database" && <Database />}
    </div>
  );
};

export default Editor;
