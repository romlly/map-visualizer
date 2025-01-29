import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Composant pour la heatmap
const HeatmapLayer = ({ points }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!points || !points.length) return;

    // Convertit les points au format attendu par leaflet.heat
    const heatPoints = points.map(point => [
      parseFloat(point.lat),
      parseFloat(point.lng),
      1 // intensité du point
    ]).filter(point => !isNaN(point[0]) && !isNaN(point[1]));

    const heat = L.heatLayer(heatPoints, {
      radius: 20, // Rayon des points
      blur: 15, // Niveau de flou
      maxZoom: 12, // Zoom maximum pour la heatmap
      max: 1.0, // Intensité maximum
      minOpacity: 0.3, // Opacité minimum pour les zones les moins denses
      gradient: {
        0.2: '#2b83ba',
        0.4: '#abdda4',
        0.6: '#ffffbf',
        0.8: '#fdae61',
        1.0: '#d7191c'
      }
    }).addTo(map);

    // Ajuster la vue pour inclure tous les points
    if (heatPoints.length > 0) {
      const bounds = L.latLngBounds(heatPoints.map(point => [point[0], point[1]]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

const FranceHeatmap = () => {
  const [points, setPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Position initiale plus large pour inclure les pays limitrophes
  const center = [47.0, 5.0]; // Centre légèrement ajusté
  const zoom = 5; // Zoom initial plus large

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError('Erreur lors de la lecture du fichier CSV');
          console.error('Erreurs Papa Parse:', results.errors);
        } else {
          // Vérifie que les colonnes requises sont présentes
          const hasRequiredColumns = results.meta.fields.includes('lat') && 
                                   results.meta.fields.includes('lng');
          
          if (!hasRequiredColumns) {
            setError('Le fichier CSV doit contenir les colonnes "lat" et "lng"');
          } else {
            // Filtre les points invalides
            const validPoints = results.data.filter(
              point => !isNaN(point.lat) && !isNaN(point.lng)
            );

            // Log des bornes pour debug
            const minLat = Math.min(...validPoints.map(p => p.lat));
            const maxLat = Math.max(...validPoints.map(p => p.lat));
            const minLng = Math.min(...validPoints.map(p => p.lng));
            const maxLng = Math.max(...validPoints.map(p => p.lng));
            console.log(`Bornes des données: 
              Latitude: ${minLat} à ${maxLat}
              Longitude: ${minLng} à ${maxLng}`);

            setPoints(validPoints);
            console.log(`${validPoints.length} points chargés`);
          }
        }
        setIsLoading(false);
      },
      error: (error) => {
        setError('Erreur lors de la lecture du fichier');
        console.error('Erreur Papa Parse:', error);
        setIsLoading(false);
      }
    });
  };

  return (
    <div>
      <div style={{ 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ 
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        {isLoading && <div>Chargement des données...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {points.length > 0 && (
          <div>Nombre de points chargés : {points.length}</div>
        )}
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '700px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.length > 0 && <HeatmapLayer points={points} />}
      </MapContainer>
    </div>
  );
};

export default FranceHeatmap;