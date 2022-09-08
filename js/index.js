

$.post('php/controller.php', {'action':'getConferences'}, function(data) {
    document.getElementById('tbody').innerHTML = data;
    
    })
.error(function(){alert("PostError")});