var topics = ["Simpsons", "Bobs Burgers", "The Wire"];

function displayTvShow() {
    var tvShow = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating
            var p = $("<p>").text("Rating: " + rating);
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            var gifImage = $("<img>");
            gifImage.attr("src", still);
            gifImage.attr("data-still", still)
            gifImage.attr("data-animated", animated)
            gifImage.addClass("giffy");
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $(".gifDisplay").prepend(gifDiv);
            console.log(queryURL);
        }
    });
}

function renderButtons() {
    $("#buttonDisplay").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("tvShow");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttonDisplay").append(a);
    }

}

$("#add-tvShow").on("click", function(event) {
    event.preventDefault();
    var newShow = $("#tv-input").val().trim();
    topics.push(newShow);
    renderButtons();
    console.log(topics);
});

$(document).on("click", ".tvShow", displayTvShow);
$(document).on("click", ".giffy", function() {
   var state = $(this).attr("data-state");
   if (state === "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
   }
   else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
   }
});

renderButtons();