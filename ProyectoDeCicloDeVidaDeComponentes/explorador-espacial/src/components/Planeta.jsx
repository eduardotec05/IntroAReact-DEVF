import React, { useEffect } from 'react';

function Planeta({ nombre }) {
  useEffect(() => {
    console.log(`¡El planeta ${nombre} ha aparecido!`);
    
    return () => {
      console.log(`¡El planeta ${nombre} ha desaparecido!`);
    };
  }, [nombre]);

  return (
    <h3 className="planeta-nombre">
      🌎 {nombre}
    </h3>
  );
}

export default Planeta;