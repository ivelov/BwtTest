//Calls changing location on country choose
$('select').on('change', function (e) {
  if (typeof myMap !== 'undefined')
    myMap.changeCountry(this.value);
});
/** 
  * Saves or creates new conference
  * @param {bool} isNew if true - creates new, otherwise saves
  */
function onSubmit(isNew) {
  //If myMap isn't defined - don't go on
  if (typeof myMap == 'undefined')
    return;

  //Remove text about upload
  $('#text-upload').addClass('dont-display');

  name = $('#name').val();
  id = $('#num').val();
  country = $('#select').val();
  lat = myMap.getLat();
  lon = myMap.getLon();
  date =  $('#pickadate').val();
  time =  $('#pickatime').val();
  hasError = false;

  //If name input is empty
  if(name.trim().length === 0){
    $('#name').addClass('is-invalid');
    hasError = true;
  } else {
    $('#name').removeClass('is-invalid');
  }
  //If date input is empty
  if(date.trim().length === 0){
    $('#pickadate').addClass('is-invalid');
    hasError = true;
  } else {
    $('#pickadate').removeClass('is-invalid');
  }
  //If time input is empty
  if(time.trim().length === 0){
    $('#pickatime').addClass('is-invalid');
    hasError = true;
  } else {
    $('#pickatime').removeClass('is-invalid');
  }

  if(hasError){
    return;
  }
  
  datetime = convertTime(date+' '+time);

  //Show wait text and disable button
  $('#sbm-btn').addClass('disabled');
  $('#text-wait').removeClass('dont-display');

  addOrUpdConf(isNew, id, name, country, lat, lon, datetime);
  
  
    
}


function addOrUpdConf(isNew, id, name, country, lat, lon, datetime) {
    $.post('php/controller.php', {'action':(isNew?'addConference':'updateConference'),
    'id':parseInt(id), 'name':name, 'country':country, 'lat':lat, 'lon':lon, 'date':datetime}, function(data) {
        console.log(data);
        //Notify about upload success
        $('#sbm-btn').removeClass('disabled');
        $('#text-wait').addClass('dont-display');
        $('#text-upload').removeClass('dont-display');
        })
    .error(function(){alert("PostError")});
    if(isNew){
      $('#name').val('');
    }
}

/** 
  * Converts date string to mysql datetime format string 
  * @param {string} datetime
  * @return {string} datefull (yyyy-mm-dd hh:mm:ss)
  */
function convertTime(datetime){
  dateFull = new Date(datetime);
  return dateFull.getFullYear()+'-'+
dateFull.getMonth()+'-'+
dateFull.getDate()+' '+
dateFull.getHours()+':'+
dateFull.getMinutes()+':'+
dateFull.getSeconds();
}

var myMap = new MyMap();

$(function(){
  
//Adds functionality to date and time pickers
$('.pickadate').pickadate();
$('.pickatime').pickatime();

});



