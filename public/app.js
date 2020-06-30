$.getJSON("/articles", function(data) { 
    for (let i = 0; i < data.length; i++) {
        let arr = data[i].class.split(" ");
        arr = arr.slice(7);
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + arr + "</p>");
    }
});

$(document).on("click", "p", function() { 
    $("#notes").empty();
    let thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data) {
        $("#notes").append("<h3>" + data.title + "</h3>");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>")
        
        if(data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});

$(document).on("click", "#savenote", function() {
    let thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function(data) {
            $("#notes").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val(""); 
})