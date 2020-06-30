const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "notes"
    }
});

const Articles = mongoose.model("Articles", ArticlesSchema);

module.exports = Articles;
