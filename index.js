const deckgl = new deck.DeckGL({
    mapboxApiAccessToken: 'pk.eyJ1Ijoic29veW91biIsImEiOiJja2U3czRhMXcxYzZ0MnhxdnFlZ3N6c2UzIn0.XC1kBXAWb8471IWcfKX2EA',
    mapStyle: 'mapbox://styles/mapbox/dark-v9',
    initialViewState: {
      longitude: -1.4157,
      latitude: 52.2324,
      zoom: 6,
      minZoom: 5,
      maxZoom: 15,
      pitch: 40.5
    },
    controller: true
  });
  
  const data = d3.csv('https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv');
  
  const OPTIONS = ['radius', 'coverage', 'upperPercentile'];
  
  const COLOR_RANGE = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
  ];
  
  OPTIONS.forEach(key => {
    document.getElementById(key).oninput = renderLayer;
  });
  
  renderLayer();
  
  function renderLayer () {
    const options = {};
    OPTIONS.forEach(key => {
      const value = +document.getElementById(key).value;
      document.getElementById(key + '-value').innerHTML = value;
      options[key] = value;
    });
  
    const hexagonLayer = new deck.HexagonLayer({
      id: 'heatmap',
      colorRange: COLOR_RANGE,
      data,
      elevationRange: [0, 1000],
      elevationScale: 250,
      extruded: true,
      getPosition: d => [Number(d.lng), Number(d.lat)],
      opacity: 1,
      ...options
    });
  
    deckgl.setProps({
      layers: [hexagonLayer]
    });
  }
  