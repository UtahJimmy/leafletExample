
/////////////////////////////////////
//
//            VARIABLES
//
/////////////////////////////////////
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

var zoomLevel = 11;
var slcLocation = [40.710,-111.870];

//set map view location and zoom level
var myMap = L.map('mapid').setView(slcLocation,zoomLevel);


//var csv is the CSV contents with headers
var file = "data/sensorPosition.csv";
var senPos = readTextFile(file);
var senJSON = csvJSON(senPos);


var markerList={}


/////////////////////////////////////
//
//            STATEMENTS
//
/////////////////////////////////////
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

Object.keys(senJSON).forEach(function(k,i){

    var sensor = senJSON[i]
    var lat = parseFloat(sensor.lat);
    var lng = parseFloat(sensor.long);
    var id  = sensor.ID;
    var type = sensor.type;

    console.log(k, lat,lng,id, type)

    markerList[id] = L.circleMarker ([lat,lng], circMarkerOptions).addTo(myMap);

    markerList[id].on("mouseOver",mouseOverEvent);
    markerList[id].on("click", clickEvent);
    //markerList[sensor.ID] = L.circleMarker ([lat,lng], circMarkerOptions).addTo(myMap);

});




/////////////////////////////////////
//
//            FUNCTIONS
//
/////////////////////////////////////
function csvJSON(csv){

    var lines=csv.split('\n');

    var result = [];

    var headers=lines[0].split(',');
    lines.splice(0, 1);
    lines.forEach(function(line) {
        var obj = {};
        var currentline = line.split(',');
        headers.forEach(function(header, i) {
            obj[header] = currentline[i];
        });
        result.push(obj);
    });

    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
}
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                //console.log(allText);

            }
        }
    }
    rawFile.send(null);
    return rawFile.responseText;
}

function clickEvent(e){
    console.log(this);
    this.options['fillOpacity']= 0;
}

function mouseOverEvent(e){
    console.log(this);
}
