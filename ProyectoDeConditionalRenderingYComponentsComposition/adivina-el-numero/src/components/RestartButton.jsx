function RestartButton({ onClick }) {
  return (
    <button onClick={onClick} className="restart-button">
      Jugar de nuevo
    </button>
  );
}

export default RestartButton;