
const map = L.map('map', {
    center: [25.044391, 121.532999],
    zoom: 16
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const moveIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [1, 1],
  iconAnchor: [1, 1],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const yellowIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 45],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const orangeIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [27, 47],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const greyIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const markers = new L.MarkerClusterGroup().addTo(map);;

const xhr = new XMLHttpRequest();
xhr.open("get","https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json");
xhr.send();
xhr.onload = function(){
 const data = JSON.parse(xhr.responseText).features
 side(data);
 for(let i =0; i<data.length; i++){
  let mask;
 if(data[i].properties.mask_adult > 50 && data[i].properties.mask_child > 50){
   mask = greenIcon;
 }
 else if((data[i].properties.mask_adult == 0 && data[i].properties.mask_child > 0)||(data[i].properties.mask_adult > 0 && data[i].properties.mask_child == 0) ){
   mask = yellowIcon;
 }
 else if(data[i].properties.mask_adult <50 && data[i].properties.mask_adult > 0){
  mask = orangeIcon;
}
 else{
   mask = greyIcon;
 } markers.addLayer(L.marker([data[i].geometry.coordinates[1],data[i].geometry.coordinates[0]],
     {icon: mask}).bindPopup('<h1>'+data[i].properties.name+'</h1>'
     +'<p>位置: '+data[i].properties.address+'</p>'
     +'<p>'+data[i].properties.phone+'</p>'
     +'<p>口罩販售: '+data[i].properties.note+'</p>'
     +'<p>成人口罩數量: '+data[i].properties.mask_adult+'</p>'
     +'<p>兒童口罩數量: '+data[i].properties.mask_child+'</p>'));
 }
 map.addLayer(markers);
}







