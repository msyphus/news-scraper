var articleId;

$.ajax({
    method: "GET",
    url: "/saved-articles"
})
.then(function(data) {
    for (var i = 0; i < data.length; i++) {
         var arr = data[i].class.split(' ');
         arr = arr.slice(7);
         arr = arr.join('; ');
        $("#savedArticles").append("<button type='button' class='btn btn-primary headlines' data-toggle='collapse' data-target='#accordion" + [i] + "' data-id='" + data[i]._id + "'>" + data[i].title + "</button>");
        $("#savedArticles").append("<p id='accordion" + [i] + "' class='collapse articleData'>" + "<a href='" + data[i].link + "' target='_blank'>" + data[i].link + "</a>" + "<br />" + arr + "<br />" + data[i].note + "<br />" + "<button class='btn btn-primary addNote' id='editArticle' data-toggle='modal' data-target='#notesModal'>Edit Article</button>" + "</p>");
    }
});

$(document).on("click", "#homeBtn", function () {
    window.location.href = "/index.html"
});

$(document).on("click", ".headlines", function () {
    articleId = $(this).attr("data-id");
})

$(document).on("click", "#editArticle", function() {
    $.ajax({
        method: "GET",
        url: "/saved-articles/" + articleId
    })
    .then(function(response) {
        $("#bodyinput").val(response.note);
    })
});

$(document).on("click", "#savenote", function () {
    $.ajax({
        method: "POST",
        url: "/saved-articles/" + articleId,
        data: {
            note: $("#bodyinput").val()
        }
    })
    .then(function () {
        alert("Note updated!");
        window.location.reload();
    });
});

$(document).on("click", "#deleteNote", function() {
    $.ajax({
        method: "POST",
        url: "/saved-articles/" + articleId,
        data: {
            delete: true
        }
    })
    .then(function(response) {
        alert("Article deleted");
        window.location.reload();
    })
})