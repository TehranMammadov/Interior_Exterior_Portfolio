const mongoose = require("mongoose");
const {Schema, model} = mongoose

const InteriorSchema = new Schema(
    {
        title: String,
        module : [{type: Schema.Types.ObjectId, ref : "Module"}],
        posterImage: [{type: Schema.Types.ObjectId, ref: "Image"}],
        category: [{type: Schema.Types.ObjectId, ref: "Category"}],
        description: {type : String},
        content:{type:Schema.Types.Mixed},
        footerImage:[{type: Schema.Types.ObjectId, ref: "Image"}],
        spiker: String,
        place : String,
        startDate: String,
        endDate : String
    },{timestamps: true}
);

InteriorSchema.pre('findOne', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

InteriorSchema.pre('find', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

module.exports=model("Interior", InteriorSchema);