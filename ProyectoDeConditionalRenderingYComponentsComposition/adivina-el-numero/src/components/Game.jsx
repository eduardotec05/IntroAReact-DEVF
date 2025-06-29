import { useState, useEffect } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';

function Game() {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState('initial'); // 'initial', 'higher', 'lower', 'win', 'invalid'
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setStatus('initial');
    setAttempts(0);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const userGuess = Number(guess);
    
    if (isNaN(userGuess)) {
      setStatus('invalid');
      return;
    }

    if (userGuess < 1 || userGuess > 100) {
      setStatus('invalid');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === targetNumber) {
      setStatus('win');
    } else if (userGuess < targetNumber) {
      setStatus('higher');
    } else {
      setStatus('lower');
    }
  };

  return (
    <div className="game-container">
      <h1>Adivina el número</h1>
      <form onSubmit={handleGuess}>
        <div className="input-container">
          <InputNumber 
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={status === 'win'}
          />
          {status !== 'win' && (
            <button type="submit">
              {attempts === 0 ? 'Comenzar' : 'Adivinar'}
            </button>
          )}
        </div>
      </form>
      
      <Message status={status} attempts={attempts} />
      
      {attempts > 0 && status !== 'win' && (
        <div className="attempts">Intentos: {attempts}</div>
      )}
      
      {status === 'win' && <RestartButton onClick={startNewGame} />}
    </div>
  );
}

export default Game;