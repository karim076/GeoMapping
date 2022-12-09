// empty array
var array = [];
// create a map
var map = L.map('map').setView([51.5719149, 4.768323], 13);
// create a tilelayer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// create a new icon
var greenIcon = L.icon({
    iconUrl: 'img/curio.png',
    
    iconSize:     [40, 40], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
fetch('https://6391a4c6ac688bbe4c4df3d1.mockapi.io/locations')
.then( result => result.json())

.then( locatie => {
    // create an forloop
    for (let i = 0; i < locatie.length; i++) {
        L.marker([locatie[i].lat, locatie[i].lng], {icon: greenIcon}).addTo(map).bindPopup(Createname());               
    };
    // create a new for each
    locatie.forEach(item =>{
        // push the lat and lng to the array
        array.push(new L.LatLng(item.lat, item.lng));
    });
    // create a new settings for the polyline
    var firstpolyline = new L.polyline(array, {
        color: 'red',
        weight: 5,
        opacity: 1,
        smoothFactor: 1
    });
    // add the polyline to the map
    firstpolyline.addTo(map);
});




// get longitude and latitude from click on map
map.on('click', function(e) {
    // show the input field
    document.querySelector(".inputfield").style.display = "block";
    // set the value of the input field
    document.getElementById("long").value = e.latlng.lng;
    document.getElementById("lat").value = e.latlng.lat;
});

function Createname() {
    const response = fetch("https://6391a4c6ac688bbe4c4df3d1.mockapi.io/locations", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        lat: document.getElementById("lat").value,
        lng: document.getElementById("long").value,
        name: document.getElementById("name").value
    })
});
// verstuur value in een post request naar de api

}