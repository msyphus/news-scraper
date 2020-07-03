var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SavedSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    note: {
        type: String
    }
});

var Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;