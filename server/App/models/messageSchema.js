const mongoose = require("mongoose");
const {Schema, model} = mongoose


const MessageSchema = new Schema({
    email: {type: String},
    phone:{type:String},
    message: {type: String},
}, {  timestamps : true, autoCreate : false,strictPopulate: false});

MessageSchema.pre('findOne', function () {
    this.select({updatedAt:0,__v:0})
});

MessageSchema.pre('find', function () {
    this.select({updatedAt:0,__v:0})
});


module.exports= model('Message', MessageSchema);