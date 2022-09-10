//Calls changing location on country choose
$('select').on('change', function (e) {
  if (typeof myMap !== 'undefined')
    myMap.changeCountry(this.value);
});

function onSubmit() {
  //If myMap isn't defined - don't go on
  if (typeof myMap == 'undefined')
    return;

  //Remove text about upload
  document.getElementById('text-upload').classList.add('invisible');

  name = document.getElementById('name').value;
  country = document.getElementById('select').value;
  lat = myMap.getLat();
  lon = myMap.getLon();
  date = document.getElementsByClassName('pickadate')[0].value;
  time = document.getElementsByClassName('pickatime')[0].value;
  hasError = false;

  //If name input is empty
  if(name.trim().length === 0){
    document.getElementById('name').classList.add('is-invalid');
    hasError = true;
  } else {
    document.getElementById('name').classList.remove('is-invalid');
  }
  //If date input is empty
  if(date.trim().length === 0){
    document.getElementsByClassName('pickadate')[0].classList.add('is-invalid');
    hasError = true;
  } else {
    document.getElementsByClassName('pickadate')[0].classList.remove('is-invalid');
  }
  //If time input is empty
  if(time.trim().length === 0){
    document.getElementsByClassName('pickatime')[0].classList.add('is-invalid');
    hasError = true;
  } else {
    document.getElementsByClassName('pickatime')[0].classList.remove('is-invalid');
  }

  if(hasError){
    return;
  }
  
  datetime = convertTime(date+' '+time);

  //Show wait text and disable button
  document.getElementById('sbm-btn').classList.add('disabled');
  document.getElementById('text-wait').classList.remove('invisible');

    $.post('php/controller.php', {'action':'addConference',
  'name':name, 'country':country, 'lat':lat, 'lon':lon, 'date':datetime}, function(data) {
      console.log(data);
      //Notify about upload success
      document.getElementById('sbm-btn').classList.remove('disabled');
      document.getElementById('text-wait').classList.add('invisible');
      document.getElementById('text-upload').classList.remove('invisible');
      })
  .error(function(){alert("PostError")});
}

//Converts date string to mysql datetime format string
function convertTime(datetime){
  dateFull = new Date(datetime);
  return dateFull.getFullYear()+'-'+
dateFull.getMonth()+'-'+
dateFull.getDate()+' '+
dateFull.getHours()+':'+
dateFull.getMinutes()+':'+
dateFull.getSeconds();
}

//Adds functionality to date and time pickers
$('.pickadate').pickadate();
$('.pickatime').pickatime();

var myMap = new MyMap();




