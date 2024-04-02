import { Ball } from "../utils/ball";

type Props = {
  ball: Ball;
  onClose: () => void;
};

const colors = ["yellow", "blue", "red", "purple", "cyan", "orange"];

function Modal({ ball, onClose }: Props) {
  const handleClick = (color: string) => {
    ball.color = color;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>x</button>
        <div>
          {colors.map((color) => (
            <button onClick={() => handleClick(color)} key={color}>
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
