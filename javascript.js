$(function(){
    populateButtons(searchArray,'searchButton','#buttonsArea');
})

var searchArray = ["Dog","Cat", "Bird"];

function populateButtons(searchArray,classToAdd,addArea){
    $(addArea).empty();
    for(var i=0; i<searchArray.length; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('dataType',searchArray[i]);
        a.text(searchArray[i]);
        $(addArea).append(a);
    }
}

$(document).on('click','.searchButton',function(){
    $('#searches').empty();
    var type = $(this).attr('dataType');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=ftiUgQL3tHT1bJddfbQnMJNvSdMYG1Ct&limit=10';
    $.ajax({url:queryURL,method:'GET'})
        .done(function(response){
            for(var i=0;i<response.data.length;i++){
                var searchDiv = $('<div class="searchItem">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: '+rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src',still);
                image.attr('data-still',still);
                image.attr('data-animated',animated);
                image.attr('data-state','still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
    })
})
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state', 'animated');
    }else{
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state', 'still'); 
    }
})

$('#addSearch').on('click',function(event){
    event.preventDefault();
    var newSearch = $('input').val();
    searchArray.push(newSearch);
    populateButtons(searchArray,'searchButton','#buttonsArea');
    return false;
})