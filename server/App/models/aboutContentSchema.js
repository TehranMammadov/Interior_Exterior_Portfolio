const mongoose = require("mongoose");
const {Schema, model} = mongoose

const aboutSchema = new Schema(
    {
        row:Number,
        image: [{type: Schema.Types.ObjectId, ref: "Image"}]
    }, {timestamps: true}
);

aboutSchema.pre('findOne', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

aboutSchema.pre('find', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

module.exports =model('AboutContent', aboutSchema);