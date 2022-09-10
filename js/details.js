
/** 
  * Disables or enables all inputs 
  * @param {bool} disable
  */
function toggleInputs(disable) {             
    $('#name').prop('disabled',disable);
    $('#select').prop('disabled',disable);
    $('#pickadate').prop('disabled',disable);
    $('#pickatime').prop('disabled',disable);
}

/** 
  * Gets conf details and sets it in inputs
  * @param {int} id 
  */
function setConfDetails(id) {       
    $.post('php/controller.php', {'action':'getConfDetails', 'id':parseInt(id)}, function(data) {
        json = JSON.parse(data.substring(1,data.length-1));

        $('#num').val(json['id']);
        $('#name').val(json['name']);
        $('#select').val(json['country']);
        document.getElementById('pickadate').value = json['date'].substring(0,10);
        document.getElementById('pickatime').value = json['date'].substring(11,19);
        //$(('#pickadate').val( json['date'].substring(0,10) ));
        //$(('#pickatime').val( json['date'].substring(11,19) ));

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

function onEditClick(){
    toggleInputs(false);
    $('#sbm-btn').removeClass('dont-display');
    $('#cancel-btn').removeClass('dont-display');
    $('#edit-btn').addClass('dont-display');
    myMap.setDraggable(true);
}



window.initMap = initMap;

var mapStartPos;

$(function(){
    //Get id of choosen conf
    const urlParams = new URLSearchParams(window.location.search);
    const confId = urlParams.get('id');

    toggleInputs(true);
    setConfDetails(confId);
  
  });



