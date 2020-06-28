const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const NotesSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
