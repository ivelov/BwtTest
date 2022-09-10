//Disables all inputs
function disableAll() {
    document.getElementById('name').disabled = true;
    document.getElementById('select').disabled = true;
    document.getElementsByClassName('pickadate')[0].disabled = true;
    document.getElementsByClassName('pickatime')[0].disabled = true;
}

function enableAll(){
    document.getElementById('name').disabled = false;
    document.getElementById('select').disabled = false;
    document.getElementsByClassName('pickadate')[0].disabled = false;
    document.getElementsByClassName('pickatime')[0].disabled = false;
}

//Gets conf details and sets it in inputs
function setConfDetails(id) {
    $.post('php/controller.php', {'action':'getConfDetails', 'id':parseInt(id)}, function(data) {
        json = JSON.parse(data.substring(1,data.length-1));
        document.getElementById('name').value = json['name'];
        document.getElementById('select').value = json['country'];
        document.getElementsByClassName('pickadate')[0].value = json['date'].substring(0,10);
        document.getElementsByClassName('pickatime')[0].value = json['date'].substring(11,19);
        if(myMap.isInit){
            myMap.changeLocation({ lat:parseFloat(json['latitude']), lng:parseFloat(json['longitude']) });
        } else {
            mapStartPos = {lat: parseFloat(json['latitude']), lng:parseFloat(json['longitude'])};
        }

      })
  .error(function(){alert("PostError")});
}



//Unknown bug appears when calling method straightaway
function initMap() {
    myMap.initMap(false, mapStartPos);
}


window.initMap = initMap;

//Get id of choosen conf
const urlParams = new URLSearchParams(window.location.search);
const confId = urlParams.get('id');
var mapStartPos;

disableAll();
setConfDetails(confId);

