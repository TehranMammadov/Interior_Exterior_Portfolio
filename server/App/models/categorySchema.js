const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    categoryName: String,
});

categorySchema.pre('findOne', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

categorySchema.pre('find', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});


module.exports= model("Category", categorySchema);