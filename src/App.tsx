import React from "react";
import Billiards from "./components/Billiards";
import Menu from "./components/Menu";

const App: React.FC = () => {
  return (
    <div className="main-container">
      <Billiards />
      <Menu />
    </div>
  );
};

export default App;
