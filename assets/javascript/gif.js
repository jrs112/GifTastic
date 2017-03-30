$(document).ready(function(){

    var topics = ["Simpsons", "Bobs Burgers", "The Wire", "Twenty Four", "King of the Hill"];

    function displayTvShow() {
        $(".gifDisplayOne").empty();
        $(".gifDisplayTwo").empty();
        $(".gifDisplayThree").empty();
        var tvShow = $(this).attr("data-name");
        var queryURLOne = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=4";
        var queryURLTwo = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=7";
        var queryURLThree = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURLOne,
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
                gifDiv.append(gifImage);
                gifDiv.append(p);
                $(".gifDisplayOne").prepend(gifDiv);
            }
        });

          $.ajax({
          url: queryURLTwo,
          method: "GET"
        }).done(function(response) {
            var results = response.data;
            for (var i = 4; i < results.length; i++) {
                var gifDivTwo = $("<div>");
                var ratingTwo = results[i].rating
                var pTwo = $("<p>").text("Rating: " + ratingTwo);
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                var gifImageTwo = $("<img>");
                gifImageTwo.attr("src", still);
                gifImageTwo.attr("data-still", still)
                gifImageTwo.attr("data-animated", animated)
                gifImageTwo.addClass("giffy");
                gifDivTwo.append(gifImageTwo);
                gifDivTwo.append(pTwo);
                $(".gifDisplayTwo").prepend(gifDivTwo);
            }
        });

        $.ajax({
          url: queryURLThree,
          method: "GET"
        }).done(function(response) {
            var results = response.data;
            for (var i = 7; i < results.length; i++) {
                var gifDivThree = $("<div>");
                var ratingThree = results[i].rating
                var pThree = $("<p>").text("Rating: " + ratingThree);
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                var gifImageThree = $("<img>");
                gifImageThree.attr("src", still);
                gifImageThree.attr("data-still", still)
                gifImageThree.attr("data-animated", animated)
                gifImageThree.addClass("giffy");
                gifDivThree.append(gifImageThree);
                gifDivThree.append(pThree);
                $(".gifDisplayThree").prepend(gifDivThree);
            }
        });
    }

    function renderButtons() {
        $("#buttonDisplay").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("tvShow");
            a.addClass("btn");
            a.addClass("btn-danger");
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
        $("#tv-input").val("");
        console.log(topics);
    });

    $(document).on("click", ".giffy", function(event) {
        event.preventDefault();
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

    $(document).on("click", ".tvShow", displayTvShow);

    renderButtons();

});