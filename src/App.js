import React from 'react';
import FranceHeatmap from './components/FranceHeatmap';

function App() {
  // Points exemple - à remplacer par vos données
  const coordinates = [
    { lat: 48.8566, lng: 2.3522 }, // Paris
    { lat: 45.7578, lng: 4.8320 }, // Lyon
    { lat: 43.2965, lng: 5.3698 }, // Marseille
  ];

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Carte de densité</h1>
      <FranceHeatmap coordinates={coordinates} />
    </div>
  );
}

export default App;
