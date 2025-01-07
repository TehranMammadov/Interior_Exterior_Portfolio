const mongoose = require("mongoose");
const {Schema, model} = mongoose

const moduleSchema = new Schema(
    {
        azModuleTitle: String,
        enModuleTitle: String,
        ruModuleTitle: String,
        azModuleDescription:String,
        enModuleDescription:String,
        ruModuleDescription:String,
    }, {timestamps: true}
);

moduleSchema.pre('findOne', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

moduleSchema.pre('find', function () {
    this.select({createdAt:0,updatedAt:0,__v:0})
});

module.exports= model('Module', moduleSchema);