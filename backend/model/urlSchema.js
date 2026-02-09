const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
}, {timestamps: true});

const UrlSchema = mongoose.model("Urls", urlSchema)

module.exports = UrlSchema;