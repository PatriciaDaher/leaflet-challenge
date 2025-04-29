# leaflet-challenge
Building a new set of tools that will allow The United States Geological Survey to visualize their earthquake data.

## Overview
This project visualizes real-time earthquake data from the United States Geological Survey (USGS) using Leaflet.js. The goal is to provide an informative and interactive way to explore seismic activity around the world by mapping earthquake magnitudes and depths for the past 7 days, globally. 

### Part 1: Earthquake Visualization
The visualization includes the following features:

- **Map Creation**:
  - Created using Leaflet to plot earthquakes from the USGS dataset
  - Base map layer with street view

- **Data Markers**:
  - Circle markers sized according to earthquake magnitude
  - Color-coded based on earthquake depth (darker colors for deeper earthquakes)
  - Popups showing additional earthquake information when clicked

- **Legend**:
  - Provides context for the depth color coding
  - Positioned at the bottom right of the map

## Technologies Used
- JavaScript
- Leaflet.js (interactive maps)
- HTML 
- CSS
- GeoJSON
- D3 (data fetching)

## Project Structure
leaflet-challenge/
├── README.md
├── LICENSE
├── Leaflet-Part-1/
│   ├── index.html
│   ├── images
│   └── static/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── logic.js
└── Leaflet-Part-2/ (empty folder - only there because the instructions asked to add it)

## How to Use
1. Clone the repository
2. Open `Leaflet-Part-1/index.html` in a web browser
3. The map will automatically load with the most recent earthquake data from USGS
4. Click on any earthquake marker to view additional information

## Code, Data and Map Template Sources
The application pulls live earthquake data from the USGS GeoJSON Feed, specifically the "All Earthquakes from the Past 7 Days" dataset.
**Data**:
- Earthquake data from https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
- Earthquake Data for the past 7 days (all data) JSON https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
**Map Template**:
https://www.openstreetmap.org/copyright
**Code**:
Deep Seek

## Results
The visualization provides an interactive map that displays earthquake locations during the last 7 days worldwide. The Magnitude of each earthquake is indicated via the sizes of the circular markers while depth is indicated through a color gradient presented in the legend. The map also offers further information when each marker is clicked. 

## Licesnse
Open source 
