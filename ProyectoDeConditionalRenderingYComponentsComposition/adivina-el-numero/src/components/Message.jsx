function Message({ status, attempts }) {
  // Renderizado condicional mejorado
  const getMessageContent = () => {
    switch(status) {
      case 'win':
        return (
          <div className="message-content">
            <span role="img" aria-label="celebration" style={{fontSize: '2rem'}}>🎉</span>
            <h3>¡Felicidades!</h3>
            <p>Has adivinado el número en <strong>{attempts}</strong> intento{attempts !== 1 ? 's' : ''}.</p>
          </div>
        );
      case 'higher':
        return (
          <div className="message-content">
            <span role="img" aria-label="up" style={{fontSize: '2rem'}}>⬆️</span>
            <h3>El número es mayor</h3>
            <p>Intenta con un número más grande.</p>
          </div>
        );
      case 'lower':
        return (
          <div className="message-content">
            <span role="img" aria-label="down" style={{fontSize: '2rem'}}>⬇️</span>
            <h3>El número es menor</h3>
            <p>Prueba con un número más pequeño.</p>
          </div>
        );
      case 'invalid':
        return (
          <div className="message-content">
            <span role="img" aria-label="warning" style={{fontSize: '2rem'}}>⚠️</span>
            <h3>Entrada inválida</h3>
            <p>Por favor ingresa un número entre 1 y 100.</p>
          </div>
        );
      default:
        return (
          <div className="message-content">
            <span role="img" aria-label="thinking" style={{fontSize: '2rem'}}>🤔</span>
            <h3>¡Adivina el número!</h3>
            <p>Ingresa un número entre 1 y 100 para comenzar.</p>
          </div>
        );
    }
  };

  return (
    <div className={`message ${status || 'initial'}`}>
      {getMessageContent()}
    </div>
  );
}

export default Message;