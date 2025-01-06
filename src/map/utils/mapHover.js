function MapHover(map, geoJson) {
  if (map && geoJson) {
    // GeoJSON 데이터를 지도에 추가
    map.data.addGeoJson(geoJson);

    map.data.setStyle(function (feature) {
      var color = 'transparent';

      if (feature.getProperty('isColorful')) {
        color = feature.getProperty('color');
      }

      return {
        fillColor: color,
        strokeColor: color
      };
    });

    map.data.addListener('mouseover', function (e) {
      var color = 'rgb(209, 111, 21)'

      map.data.overrideStyle(e.feature, {
        fillColor: color,
        strokeColor: color,
        strokeWeight: 3,
      });
    });

    map.data.addListener('mouseout', function (e) {
      map.data.revertStyle();
    });
  }
};

export default MapHover;