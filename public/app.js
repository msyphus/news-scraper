var articleId;
var articleTitle;
var articleLink;
var articleClass;

getArticles();

$(document).on("click", "#dailyCatch", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function() {
        alert("Got a Bite!")
        $("#articles").empty();
        getArticles();
    });
});

function getArticles() {
$.getJSON("/articles", function(data) { 
    for (var i = 0; i < data.length; i++) {
        var arr = data[i].class.split(" ");
        arr = arr.slice(7);
        arr = arr.join("; ");
        $("#articles").append("<button type='button' class='btn btn-primary headlines' data-toggle='collapse' data-target='#accordion" + [i] + "' data-id='" + data[i]._id + "'>" + data[i].title + "</button>");
        $("#articles").append("<p id='accordion" + [i] + "' class='collapse articleData'>" + "<a href='" + data[i].link + "' target='_blank'>" + data[i].link + "</a>" + "<br />" + arr + "<br />" + "<button class='btn btn-primary addNote' data-toggle='modal' data-target='#notesModal'>Save Article</button>" + "</p>");
    }
});
};

$(document).on("click", "#savedNews", function() {
    window.location.href = "/saved.html"
});

$(document).on("click", ".headlines", function() {
    var thisId = $(this).attr("data-id");
    articleId = thisId;
})

$(document).on("click", "#savenote", function() {
    $.ajax({
        method: "GET",
        url: "/articles/" + articleId
    })
    .then(function(response) {
        articleTitle = response.title;
        articleLink = response.link;
        articleClass = response.class;
    })
    .then(function() {
        $.ajax({
            method: "POST",
            url: "/articles/" + articleId,
            data: {
                body: $("#bodyinput").val()
            }
        })
        .then(function () {
            $("#bodyinput").val("");
        })
    })
    .then(function() {
        $.ajax({
            method: "POST",
            url: "/saved-articles",
            data: {
                _id: articleId,
                title: articleTitle,
                link: articleLink,
                class: articleClass,
                note: $("#bodyinput").val()
            }
        })
        .then(function (response) {
            console.log(response);
        });
    }); 
});