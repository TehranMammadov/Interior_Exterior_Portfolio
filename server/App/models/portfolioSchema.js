const mongoose = require("mongoose");
const {Schema, model} = mongoose

const portfolioSchema = new Schema(
    {
        azTitle: String,
        enTitle: String,
        ruTitle: String,
        module : [{type: Schema.Types.ObjectId, ref : "Module"}],
        posterImage: [{type: Schema.Types.ObjectId, ref: "Image"}],/*
        category: [{type: Schema.Types.ObjectId, ref: "Category"}],*/
        azDescription: {type : String},
        enDescription: {type : String},
        ruDescription: {type : String},
        azContent:{type:Schema.Types.Mixed},
        enContent:{type:Schema.Types.Mixed},
        ruContent:{type:Schema.Types.Mixed},
        footerImage:[{type: Schema.Types.ObjectId, ref: "Image"}]
    },{timestamps: true}
);

portfolioSchema.pre('findOne', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

portfolioSchema.pre('find', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

module.exports=model("Portfolio", portfolioSchema);