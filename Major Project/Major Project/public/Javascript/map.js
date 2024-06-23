
mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: 'map', 
    center: listing.geometry.coordinates, 
    zoom: 9,
  });

  const marker = new mapboxgl.Marker({color: "red"})
  .setLngLat(coordinates)
  .setPopup(new mapboxgl.Popup({offset: 25})
  .setHTML(`<h5>${listing.location} Hey Re </h5>`))
  .addTo(map);