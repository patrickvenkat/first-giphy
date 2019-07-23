  // Store a list of giphys to display on the page.
//   var savedgiphyList = ["Toy Story", "Toy Story 2", "Toy Story 3", "Toy Story 4"];
  var giphyList = [];

  function createCard(response) {
    // Create a new boostrap card container
    var article = $("<article>");
    article.addClass("card");

    // Create an image elment, add attributes, and append to figure
    var posterImage = $("<img>");
    posterImage.attr("src", response.Poster);
    posterImage.attr("alt", response.Title + " Poster");

    var giphyPoster = $("<figure>");
    giphyPoster.append(posterImage);
    article.append(giphyPoster);

    // Create a new card body container
    var cardBody = $("<div>");
    cardBody.addClass("card-body");

    // Add giphy name
    var giphyName = $("<h1>");
    giphyName.addClass("card-title");
    giphyName.html(response.Title);
    article.append(giphyName);

    // Add description
    var giphyDescription = $("<p>");
    giphyDescription.addClass("card-text");
    giphyDescription.html(response.Plot);
    article.append(giphyDescription);

    // Append the new card to the HTML body
    $("#giphy-section").append(article);

  }

  function getgiphy(giphy) {

    // queryURL endpoint for OMDB API
    var queryURL = "https://www.omdbapi.com/?t=" + giphy + "&apikey=trilogy";

    // AJAX call to OBMD API with promise and callback handler
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      if (response.Response === "False") {
        alert(response.Error);
      }
      else if (giphyList.indexOf(response.Title) >= 0) {
        alert ("giphy already in List!")
      }
      else {
        createCard(response);
        giphyList.push(response.Title);
      }
    });

  }

  // Create a bootstrap card for each item in the giphyList array

  for (var i = 0; i < giphyList.length; i++) {

    var giphy = giphyList[i];
    getgiphy(giphy);

  }

  //
  // TO DO: Create button click handler to get the form submission,
  // and call the AJAX function, passing the name of the new giphy
  //

  $("#search").click(function() {

    var giphy = $("#film-name").val();
    getgiphy(giphy);
    
  });
