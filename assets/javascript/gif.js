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
            var p = $("<div>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);
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

renderButtons();