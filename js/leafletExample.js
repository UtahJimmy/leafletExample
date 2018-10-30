
/////////////////////////////////////
//
//            VARIABLES
//
/////////////////////////////////////
var markerRadius = 6;
var circMarker1Options = {
    radius:markerRadius,
    color:'#000000',
    weight:2,
    fill:true,
    fillColor:'#ffffff',
    fillOpacity: 0.9,
    interactive:true
};

var circMarker2Options = {
    radius:markerRadius,
    color:'#000000',
    weight:2,
    fill:true,
    fillColor:'#fea211',
    fillOpacity: 0.9,
    interactive:true
};

var clickOn = "#3e79d2";
var clickOff = "#eeede9";



var zoomLevel = 11;
var slcLocation = [40.710,-111.870];

//set map view location and zoom level
var myMap = L.map('mapid').setView(slcLocation,zoomLevel);


//var csv is the CSV contents with headers
var file = "data/sensorPosition.csv";
var senPos = readTextFile(file);
var senJSON = csvJSON(senPos);


var markerList={};


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


Object.keys(senJSON).forEach(function(k,i){

    var sensor = senJSON[i];
    var lat = parseFloat(sensor.lat);
    var lng = parseFloat(sensor.long);
    var id  = sensor.ID;
    var type = sensor.type;

   // console.log("ID: " + id + " length = " +id.length);


    //console.log(k, lat,lng,id, type)

    if(id.length > 5) {
        markerList[id] = L.circleMarker ([lat,lng], circMarker1Options).addTo(myMap)

    } else{
        markerList[id] = L.circleMarker ([lat,lng], circMarker2Options).addTo(myMap);
    }

    markerList[id].bindPopup("<b>monitor: </b>" + id);
    markerList[id]._path.id = id;
    //console.log(markerList[id]);
    //markerList[id].sourceTarget._leaflet_id = id;
    markerList[id].on("mouseover",mouseOverEvent);
    markerList[id].on("click", clickEvent);
    markerList[id].on('mouseout',mouseOutEvent);
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

    var markerID = e.sourceTarget._path.id;

    var dot = document.getElementById(markerID);

    var dotColor = dot.attributes.fill.value;
    //var dot = d3.select('#'+markerID);
    console.log("Dot color: " + dotColor);

    if(dotColor == clickOn){
        dot.style.fill = clickOff;
    } else {
        dot.style.fill = clickOn
    }
   // dot.style.fill='black';s
}

function mouseOverEvent(e){

    var markerID = e.sourceTarget._path.id;
    this.openPopup();
    console.log("you hovered " + markerID);

}



function mouseOutEvent(e){

    var markerID = e.sourceTarget._path.id;
    this.closePopup();
    console.log("you hovered " + markerID);

}
