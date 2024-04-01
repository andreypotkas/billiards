import React from "react";

interface Props {}

const Menu: React.FC<Props> = () => {
  const colors = ["#ff0000", "#00ff00", "#0000ff"];

  return (
    <div>
      {colors.map((color) => (
        <button key={color}></button>
      ))}
    </div>
  );
};

export default Menu;
