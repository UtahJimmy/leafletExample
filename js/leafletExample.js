var circMarkerOptions = {
    radius:6,
    title:"test",
    color:'#000000',
    weight:2,
    fill:true,
    fillColor:'#ffffff',
    fillOpacity: 0.9,
    interactive:true
};


//set map view location and zoom level
var myMap = L.map('mapid').setView([40.750,-111.900],12);

// Add tile layer to map -- MapBox Streets tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken:'pk.eyJ1IjoiamFtb29yZTg0IiwiYSI6ImNqbm0zeWo5ZTAwcDIzcXM4NjJ4czBuODUifQ.cJSLiKVi7lbGzE4RQTRNHA'
}).addTo(myMap);



var circ = L.circleMarker([40.7, -111.899], circMarkerOptions
)
    .on('click',clickEvent)
    .addTo(myMap);

var circ2 = L.circleMarker([40.7, -111.91], circMarkerOptions
).addTo(myMap);




circ2.on('click',clickEvent) ;

function clickEvent(e){
    console.log(this);
    this.options['fillOpacity']= 0;
}

