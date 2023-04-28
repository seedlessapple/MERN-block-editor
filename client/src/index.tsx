import ReactDOM from "react-dom/client";
import React from "react";
import "styles/global.scss";
import "styles/fonts.scss";
import Editor from "./editor/Editor";
// import Test from "test/Test";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Editor />);
