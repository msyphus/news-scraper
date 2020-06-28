const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = 3000;

const db = require("./models");
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(MONGODB_URI)

app.get("/scrape", function(req, res) {
    axios.get("https://www.undercurrentnews.com/upstream/aquaculture/").then(function(response) {
        const $ = cheerio.load(response.data);
        $("article a").each(function(i, element) {
            let result = {};
            result.title = $(element).find("a").attr("title");
            result.link = $(element).find("a").attr("href");

            db.Articles.create(result)
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
    db.Articles.find({})
    .populate("Articles")
    .then(function(dbArticles) {
        res.json(dbArticles);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.listen(PORT, () => {
    console.log("Connected to Port " + PORT);
});