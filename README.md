# Visualisateur de Heatmap

Application React permettant de visualiser des données géographiques sous forme de carte de chaleur (heatmap).

## Fonctionnalités

- Affichage d'une carte interactive basée sur OpenStreetMap
- Chargement de fichiers CSV contenant des coordonnées géographiques
- Génération automatique d'une heatmap à partir des points
- Ajustement automatique de la vue pour inclure tous les points
- Interface simple et intuitive

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (généralement installé avec Node.js)

## Installation

1. Clonez le dépôt :
```bash
git clone [url-du-repo]
cd [nom-du-dossier]
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application en mode développement :
```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Format des données

L'application accepte des fichiers CSV avec le format suivant :

- Deux colonnes obligatoires : `lat` et `lng`
- Les valeurs doivent être des nombres décimaux (format : 48.8566, 2.3522)
- Le séparateur doit être une virgule (,)
- Le fichier doit avoir un en-tête avec les noms des colonnes

Exemple de fichier CSV valide :
```csv
lat,lng
48.8566,2.3522
45.7578,4.8320
43.2965,5.3698
```

## Configuration de la Heatmap

La heatmap est configurée avec les paramètres suivants :
- Rayon des points : 20 pixels
- Niveau de flou : 15
- Zoom maximum : niveau 12
- Gradient de couleurs : bleu → vert → jaune → rouge
- Opacité minimum : 0.3

## Technologies utilisées

- React
- Leaflet
- react-leaflet
- leaflet.heat
- PapaParse (pour le parsing CSV)

## Scripts disponibles

- `npm start` : Lance l'application en mode développement
- `npm build` : Compile l'application pour la production
- `npm test` : Lance les tests
- `npm eject` : Éjecte la configuration CRA (à utiliser avec précaution)

## Limitations connues

- Les fichiers CSV doivent être correctement formatés (UTF-8)
- Les performances peuvent être affectées avec un très grand nombre de points (>100 000)
- La carte nécessite une connexion internet pour charger les tuiles OpenStreetMap

## Licence

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
