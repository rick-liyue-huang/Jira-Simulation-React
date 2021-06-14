import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectList } from "./screens/projectList";
import { LoginScreen } from "./screens/login";

function App() {
  return (
    <div className="App">
      {/*<ProjectList />*/}
      <LoginScreen />
    </div>
  );
}

export default App;
