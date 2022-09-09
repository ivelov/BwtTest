class MyMap {
  constructor() {
    this.countries = {
      'ukr': { lat: 50.464963, lng: 30.533887 },
      'ru': { lat: 55.796459, lng: 37.578641 },
      'usa': { lat: 38.897029, lng: -77.071906 },
      'uk': { lat: 51.504263, lng: -0.135150 }
    };
    this.map;
    this.marker;
  }

  getLat(){
    return this.map.getCenter().lat();
  }
  getLon(){
    return this.map.getCenter().lng();
  }

  //Itializes google map with center and marker in Ukraine
  initMap() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: this.countries['ukr'],
    });

    this.marker = new google.maps.Marker({
      position: this.countries['ukr'],
      map: this.map,
      draggable: true,
    });
  }

  //Change location to choosen country
  changeLocation(country) {
    this.map.setCenter(this.countries[country], 10);
    this.marker.setPosition(this.countries[country]);
  }
}

//Unknown bug appears when calling method straightaway
function initMap() {
  myMap.initMap();
}

//Calls changing location on country choose
$('select').on('change', function (e) {
  if (typeof myMap !== 'undefined')
    myMap.changeLocation(this.value);
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
window.initMap = initMap;



