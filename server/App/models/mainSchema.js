const mongoose = require("mongoose");
const {Schema, model} = mongoose

const mainSchema = new Schema(
    {
        azTitle: String,
        enTitle: String,
        ruTitle: String,
        azTitleExtension: String,
        enTitleExtension: String,
        ruTitleExtension: String,
        image: [{type: Schema.Types.ObjectId, ref: "Image"}],
        azQuote:String,
        enQuote:String,
        ruQuote:String,
        azAuthor:String,
        enAuthor:String,
        ruAuthor:String
    }, {timestamps: true}
);

mainSchema.pre('findOne', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

mainSchema.pre('find', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

module.exports= model('Main', mainSchema);