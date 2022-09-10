function addConf(name, date, lat, long, country) {
    $.post('php/controller.php', {'action':'addConference',
    'name':name, 'date':date, 'lat':lat, 'long':long, 'country':country},
     function(data) {
        console.log(data);
        })
    .error(function(){alert("PostError")});
}

function delConf(id) {
    $.post('php/controller.php', {'action':'delConference','id':parseInt(id)}, function(data) {
        console.log(data);
        })
    .error(function(){alert("PostError")});
    
    $('#tr-'+id).remove();
}

function getConfs() {
    $.post('php/controller.php', {'action':'getConferences','page':parseInt(pageNum)}, function(data) {
        document.getElementById('tbody').innerHTML = data;
        })
    .error(function(){alert("PostError")});
    
}

function getPagesCount() {
    $.post('php/controller.php', {'action':'getRowsCount'}, function(data) {
        pagesCount = parseInt(parseInt(data)/15)+1;
        $('#span-page').text('Page '+(pageNum+1)+' of '+pagesCount);
        if(pageNum+1 >= pagesCount){
            $('#a-next').addClass("disabled");
        }
        })
    .error(function(){alert("PostError")});
}

/** 
  * Moves user to choosen page 
  * @param {int} id id of conference to be moved to
  */
function trClick(id) {
    window.location.href = "details.html?id="+id;
}

var pageNum;

$(function(){

//Get page number
const urlParams = new URLSearchParams(window.location.search);
pageNum = parseInt(urlParams.get('page'));

if(pageNum == null || isNaN(pageNum)){
    pageNum = 0;
    $('#a-prev').addClass("disabled");
} else if(pageNum <= 0){
    pageNum = 0;
    $('#a-prev').addClass("disabled");
}

getConfs();
getPagesCount();

$('#a-prev').attr("href", "index.html?page="+(pageNum-1));
$('#a-next').attr("href", "index.html?page="+(pageNum+1));

});


