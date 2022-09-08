$.post('php/index.php', {'login':"aa"}, function(data) {
    document.getElementById('test').innerHTML = data;
    
    })
.error(function(){alert("PostError")});