// button.jsx
import moon from "../../assets/objects/moon.svg";
import sun from "../../assets/objects/sun.svg"; // Импортируем вторую иконку

function Button({ onClick, theme }) {
  return (
    <div className="theme" onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Если тема dark — рисуем солнце, иначе — луну */}
      <img 
        src={theme === "dark" ? sun : moon} 
        alt={theme === "dark" ? "sun icon" : "moon icon"} 
      />
    </div>
  );
}

export default Button;
