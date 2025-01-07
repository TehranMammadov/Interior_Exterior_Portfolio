const mongoose = require("mongoose");
const {Schema, model} = mongoose


const ImageSchema = new Schema({
    url: {type: String},
}, {  timestamps : true, autoCreate : false, strictPopulate: false});

ImageSchema.pre('find', function () {
    this.select('url')
});

module.exports = model('Image', ImageSchema);