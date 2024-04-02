import React from "react";
import Billiards from "./components/Billiards";

const App: React.FC = () => {
  return (
    <div className="main-container">
      <div>Зажмите левую кнопку мыши и держите что бы ударить шар. Правый клик что бы изменить цвет</div>
      <Billiards />
    </div>
  );
};

export default App;
