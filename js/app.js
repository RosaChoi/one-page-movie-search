$(document).ready(function(){
  init();
});

function init() {
  $('.row').append($('<ul class="list-unstyled col-sm-8"></ul>'));
  $('input').keypress(pressEnter);
}

function pressEnter(key) {
  if (key.which != 13) { return; }
  getData();
}

function getData() {

  var newSearch = $('.input').val();
  var url = "http://www.omdbapi.com/?s=" + newSearch;

  $.ajax(url,
    {dataType: 'json'}
  ).done(function(response){
    var results = response["Search"];
    var movieTitles = []

    $.each(results, function(i, title){
      movieTitles.push('<li>' + results[i].Title + '</li>')
    });

    $('ul').append( movieTitles.join('') );

  });
}
