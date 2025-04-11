import React from 'react';
import GameCanvas from './components/GameCanvas';
import UIOverlay from './components/UIOverlay';

function App() {
  return (
    <div style={{ position: 'relative', width: '800px', height: '600px', margin: '0 auto' }}>
      <GameCanvas />
      <UIOverlay />
    </div>
  );
}

export default App;