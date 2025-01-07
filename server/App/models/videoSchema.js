const mongoose = require("mongoose");
const {Schema, model} = mongoose
const videoSchema = new Schema(
    {
        url: String,
        azTitle: String,
        enTitle: String,
        ruTitle: String,
        azDescription: String,
        enDescription: String,
        ruDescription: String,
    }, { timestamps: true }
);


module.exports= model("Video", videoSchema);