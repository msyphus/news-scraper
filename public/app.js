$.getJSON("/articles", function(data) { 
    for (var i = 0; i < data.length; i++) {
        var arr = data[i].class.split(" ");
        arr = arr.slice(7);
        $("#articles").append("<button type='button' class='btn btn-primary' data-toggle='collapse' data-target='#accordion" + [i] + "' data-id='" + data[i]._id + "'>" + data[i].title + "</a>");
        $("#articles").append("<p id='accordion" + [i] + "' class='collapse'>" + data[i].link + "<br />" + arr + "</p>");
    }
});

$(document).on("click", "p", function() { 
    // $("#notes").empty();
    var thisId = $(this).attr("data-id");
    
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data) {
        $("#notes").append("<h3>" + data.title + "</h3>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>")
        
        if(data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});

$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function() {
            $("#notes").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val(""); 
})