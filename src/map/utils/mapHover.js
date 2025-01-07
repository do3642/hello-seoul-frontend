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


    // 클릭 시 구로 확대
    map.data.addListener('click', function (e) {
      var clickedFeature = e.feature;

      var geometry = clickedFeature;
      var bounds = geometry.bounds;

      if (bounds) {
       
        var minPoint = bounds.getMin();
        var maxPoint = bounds.getMax();
    
        var latLngBounds = new naver.maps.LatLngBounds(
          new naver.maps.LatLng(minPoint.y, minPoint.x), // 좌하단 (위도, 경도 순서)
          new naver.maps.LatLng(maxPoint.y, maxPoint.x)  // 우상단 (위도, 경도 순서)
        );
    
        var center = latLngBounds.getCenter();
        map.morph(center,14,'linear')
      }
    });
    
    
    

  }
};

export default MapHover;