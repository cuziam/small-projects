const fs = require("fs");

//----------------------------------데이터 불러오기-----------------------------
//locations.json파일 불러오기
const filePath = "locations.json";
const rawContent = fs.readFileSync(filePath, "utf-8");
//json 데이터를 사용할 수 있도록 파싱하기.
const jsonObject = JSON.parse(rawContent);
console.log(jsonObject); //[{ address: '경북 울진 북 두천', value: 7203.527884564918 },...]
//value는 원의 반경(m 단위)을 의미함

//----------------------------------지도에 매핑---------------------------------
// Google Maps API 초기화
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 37.5665, lng: 126.978 }, // 서울 중심
  });

  var locations = jsonObject;

  // Geocoder 객체 생성
  var geocoder = new google.maps.Geocoder();

  // 각 주소에 대해 원 그리기
  locations.forEach(function (location) {
    geocodeAddress(geocoder, map, location.address, location.value);
  });
}

// 주소를 좌표로 변환하고 원 그리기
function geocodeAddress(geocoder, map, address, value) {
  geocoder.geocode({ address: address }, function (results, status) {
    if (status === "OK") {
      // 원 그리기
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.5,
        strokeWeight: 0.1,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: results[0].geometry.location,
        radius: value, // S열의 값에 따라 원의 크기 조절
      });
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status,
        address
      );
    }
  });
}
