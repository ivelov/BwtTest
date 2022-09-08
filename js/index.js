function addConf(name, date, lat, long, country) {
    $.post('php/controller.php', {'action':'addConference',
    'name':name, 'date':date, 'lat':lat, 'long':long, 'country':country},
     function(data) {
        console.log(data);
        })
    .error(function(){alert("PostError")});
}

$.post('php/controller.php', {'action':'getConferences'}, function(data) {
    document.getElementById('tbody').innerHTML = data;
    })
.error(function(){alert("PostError")});

