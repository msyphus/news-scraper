var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
// var logger = require('morgan');
var PORT = 3000;

var db = require("./models");
var app = express();

// app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, {useNewUrlParser: true,});

app.get("/scrape", function(req, res) {
    axios.get("https://www.undercurrentnews.com/upstream/aquaculture/").then(function(response) {
        var $ = cheerio.load(response.data);
        $("article").each(function(i, element) {
            var result = {};
            result.title = $(element).find("a").attr("title");
            result.link = $(element).find("a").attr("href");
            result.class = $(element).attr("class");

            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
    });
    res.send("Scrape complete!");
});

app.get("/articles", function(req, res) {
    db.Article.find({})
    .populate("Article")
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/articles/:id", function(req,res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/saved-articles", function(req, res) {
    db.Saved.find({})
        .populate("Saved")
        .then(function (dbSaved) {
            res.json(dbSaved);
        })
        .catch(function (err) {
            res.json(err);
        });
})

app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)   
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate(
                { _id: req.params.id },
                { note: dbNote._id },
                { new: true }
                );
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.post("/saved-articles", function(req, res) {
    db.Saved.create(req.body)
        .then(function(dbSaved) {
            res.json(dbSaved);
            console.log("Saved", dbSaved);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log("Connected to Port " + PORT);
});