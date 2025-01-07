const mongoose = require("mongoose");
const {Schema, model} = mongoose
const blogSchema = new Schema(
    {
        azTitle: String,
        enTitle: String,
        ruTitle: String,
        azDescription: String,
        enDescription: String,
        ruDescription: String,
        posterImage: [{type: Schema.Types.ObjectId, ref: "Image"}],
        azContent:{type:Schema.Types.Mixed},
        enContent:{type:Schema.Types.Mixed},
        ruContent:{type:Schema.Types.Mixed}/*,
        category: [{type: Schema.Types.ObjectId, ref: "Category"}],*/
    }, {timestamps: true}
);


module.exports= model("Blog", blogSchema);