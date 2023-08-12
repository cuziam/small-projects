// 구글 지도 초기화
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 37.7749, lng: -122.4194 }, // 초기 위치 설정
  });

  // 주소 읽기
  fetch("txtSample.txt")
    .then((response) => response.text())
    .then((text) => {
      const addresses = text.split("\n");
      addresses.forEach((address) => {
        addMarker(address);
      });
    });
}

// 마커 추가
function addMarker(address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    if (status === "OK") {
      const marker = new google.maps.Marker({
        map,
        position: results[0].geometry.location,
      });
    } else {
      console.error(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
}
