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
    //Tells if map is initialized
    this.isInit = false;
    }

    getLat(){
    return this.map.getCenter().lat();
    }
    getLon(){
    return this.map.getCenter().lng();
    }

    //Itializes google map
    initMap(draggable, pos = this.countries['ukr']) {
    this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: pos,
    });
    this.marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        draggable: draggable,
    });
    this.isInit=true;

    }

    //Change location to choosen country
    changeCountry(country) {
    this.map.setCenter(this.countries[country], 10);
    this.marker.setPosition(this.countries[country]);
    }

    //Changes location to choosen coordinates
    changeLocation(latlon){
        this.map.setCenter(latlon, 10);
        this.marker.setPosition(latlon);
    }



    setDraggable(isDrag){
        this.marker.setDraggable(isDrag);
    }
}