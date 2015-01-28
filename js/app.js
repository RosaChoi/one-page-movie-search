$(document).ready(function(){
  init();
});

function init() {
  $('#detailed-info').hide();
  $('input').keypress(pressEnter);
}

function pressEnter(key) {
  if (key.which != 13) { return; }
  getData($('.input').val(), "?s=");

}

function getData(keyWord, searchType) {
  var url = "http://omdbapi.com/"+ searchType + keyWord;
  $.ajax(url , { dataType: 'json'}
  ).done(function (response) {
    if (response.Search !== undefined) {
      listMovieTitles(response);
    } else if(response.Title !== undefined) {
      $('.input').val("");
      detailedMovieInfo(response);
    } else {
      $("#movie-list").append("<p>No Data Found</p>");
    }
  })
  .fail(function () {
    throw("Request failed. Try again.");
  });
}

function listMovieTitles(response) {
  $("#detailed-info").hide();
  $("#movie-list").fadeIn();
  $("#movie-titles > *").remove();

  var results = response.Search;
  var movieTitles = [];

  $.each(results, function(i, title){
    movieTitles.push('<li><a href="#">' + results[i].Title + '</a></li>')
  });

  $('#movie-titles').append( movieTitles.join('') );

  $('#movie-titles').on('click', 'a', function(){
    getData($(this).html(), "?t=");
  });
}

function detailedMovieInfo(response){
  $('#movie-list').hide();
  $('#detailed-info').fadeIn();

  $('#movie-img').append("<img src=' "+ response.Poster +" '>");
  $('#movie-details').append('<h2>' + response.Title + '</h2>');
  $('#movie-details').append('<p>' + response.Year + '</p>');

  var details = ["Rated", "Genre", "Plot", "Runtime", "Director", "Actors", "imdbRating"];
  for (var i = 0; i < details.length; i++) {
    $('#movie-details').append('<p><strong>' + details[i] + ': </strong>' + response[details[i]] + '</p>');
  }
}
