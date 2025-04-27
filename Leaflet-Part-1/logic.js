// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map
let streets = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with center and zoom options.
let map = L.map('map', {
  center: [37.09, -95.71], // Center of US
  zoom: 5
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);
// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.
// Create layer groups
const earthquakes = new L.LayerGroup(); 
const tectonicPlates = new L.LayerGroup();

// Base layers                              
const baseMaps = {
  "Base Map": basemap,
  "Street View": streets
};
// Overlay layers
const overlays = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};
// Add layer control
L.control.layers(baseMaps, overlays, { collapsed: false }).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) 
{
  
  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  
  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    return depth > 90 ? "#d73027" :
           depth > 70 ? "#fc8d59" :
           depth > 50 ? "#fee08b" :
           depth > 30 ? "#d9ef8b" :
           depth > 10 ? "#91cf60" :
                        "#1a9850";
    }
  
  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(mag) {
    return mag ? mag * 4 : 1;
  }

  // This function returns the style data for each earthquake
  function styleInfo(feature) {
    return {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      };
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      const { place, mag, time } = feature.properties;
      const depth = feature.geometry.coordinates[2];
      layer.bindPopup(`
        <strong>Location:</strong> ${place}<br/>
        <strong>Magnitude:</strong> ${mag}<br/>
        <strong>Depth:</strong> ${depth} km<br/>
        <strong>Time:</strong> ${new Date(time).toLocaleString()}
      `);
    }
  }).addTo(earthquakes);
  

    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]), // depth is the 3rd coordinate
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      });
    }
    // Set the style for each circleMarker using our styleInfo function.
    function styleInfo(feature) {
      return {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]), // depth
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      };
    }
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<strong>Magnitude:</strong> ${feature.properties.mag}<br>
         <strong>Location:</strong> ${feature.properties.place}`
      );
    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<strong>Magnitude:</strong> ${feature.properties.mag}<br>
         <strong>Location:</strong> ${feature.properties.place}`
      );
    }
  }).addTo(earthquakes);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = ["#00FF00", "#ADFF2F", "#FFFF00", "#FFA500", "#FF4500", "#FF0000"];
    
    div.innerHTML = "<h4>Earthquake Depth (km)</h4>";}

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    return div;
  };

  // Finally, add the legend to the map.
  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "legend");
    const grades = [-10, 10, 30, 50, 70, 90];

    div.innerHTML = "<strong>Depth (km)</strong><br>";
    for (let i = 0; i < grades.length; i++) {
      const from = grades[i];
      const to = grades[i + 1];
      div.innerHTML +=
        `<i style="background:${getColor(from + 1)}"></i> ` +
        `${from}${to ? "&ndash;" + to : "+"}<br>`;
    }
    return div;
  };

  legend.addTo(map);

  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    
    // Then add the tectonic_plates layer to the map.
    L.geoJson(plate_data, {
      color: "orange",
      weight: 2
    }).addTo(tectonicPlates);
  });
});
  