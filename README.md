# Fisker Net

### Demo
A demo of this app is available [here.](https://serene-brushlands-10065.herokuapp.com/)

### General
Fisker Net is a site for scraping current news related to aquaculture and fisheries.  The home page displays a brief welcome followed by two user options: "Catch of the Day" and "Saved Articles."  Below these buttons is a list of the top stories from the Aquaculture section of Undercurrent News [(https://www.undercurrentnews.com/upstream/aquaculture/).](https://www.undercurrentnews.com/upstream/aquaculture/)  This list is displaying articles stored in the site's database. To refresh the list with the current day's top stories, simply click the "Catch of the Day" button.

![Home page screenshot](/public/assets/images/home.PNG)

Clicking on a headline will toggle between expanding and collapsing an accordion that displays the article's URL and search keywords.  The URL directs to the actual article on the _Undercurrent News_ website.  To save the article for later reference or to make notes on it, click the "Save Article" button.

![Accordion screenshot](/public/assets/images/accordion.PNG)

A modal pops up that allows the user to type notes and save the article.  Clicking the "Save Article" button on the modal will save the article and any notes typed in the text box.  If no notes are desired, the text box can be left blank.

![Save Article modal screenshot](/public/assets/images/saveArticle.PNG)

To view saved articles, click the "Saved Articles" button.  This directs to a page that displays a "Home" button and list of all saved articles.  Clicking the headline toggles the accordion.  The accordion displays the notes below the search keywords and contains an "Edit Article" button.

![Saved articles page screenshot](/public/assets/images/savedArticles.PNG)

The "Edit Article" button allows the user to edit the notes for the article or to delete the article.  Editing the notes is done by clicking in the text box and typing.  To delete a note, simply delete the text in the text box and click "Save Note."  The "Delete Article" button will delete the article and associated notes from the saved page.

### Technical Information
This app was built by Mark Syphus (2020) using the following technologies:
* HTML
* CSS
* Bootstrap
* Javascript
* jQuery
* Node.js
* Express.js
* Cheerio
* Axios
* MongoDB
* Mongoose.js
* Heroku

The background image is an open source image from [www.pixabay.com](https://pixabay.com/).

### Additional Info
_Fisker_ is the Norwegian word for _fish_.  How many other fishy terms can you find in this app?