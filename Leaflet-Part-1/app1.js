// Initialize the map
const map = L.map("map").setView([20, 0], 2);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Earthquake GeoJSON Feed
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Color scale based on depth
const getColor = depth => {
  return depth > 90 ? "#d73027" :
         depth > 70 ? "#fc8d59" :
         depth > 50 ? "#fee08b" :
         depth > 30 ? "#d9ef8b" :
         depth > 10 ? "#91cf60" :
                      "#1a9850";
};

// Radius scale based on magnitude
const getRadius = mag => mag ? mag * 4 : 1;

// Load GeoJSON data using D3
d3.json(url).then(data => {
  // Use Leaflet to draw each feature
  L.geoJSON(data, {
    pointToLayer: (feature, latlng) => {
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    onEachFeature: (feature, layer) => {
      const { place, mag, time } = feature.properties;
      const depth = feature.geometry.coordinates[2];
      layer.bindPopup(`
        <strong>Location:</strong> ${place}<br/>
        <strong>Magnitude:</strong> ${mag}<br/>
        <strong>Depth:</strong> ${depth} km<br/>
        <strong>Time:</strong> ${new Date(time).toLocaleString()}
      `);
    }
  }).addTo(map);

  // Add Legend
  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "legend");
    const grades = [-10, 10, 30, 50, 70, 90];
    div.innerHTML += "<strong>Depth (km)</strong><br>";
    
    grades.forEach((d, i) => {
      const next = grades[i + 1];
      div.innerHTML +=
        `<i style="background:${getColor(d + 1)}"></i> ${d}${next ? "&ndash;" + next + "<br>" : "+"}`;
    });

    return div;
  };

  legend.addTo(map);
});