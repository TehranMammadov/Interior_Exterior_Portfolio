const mongoose = require("mongoose");
const {Schema, model} = mongoose


const RoleSchema = new Schema({
    role: {type: String},
}, {  timestamps : true, autoCreate : false,strictPopulate: false});

RoleSchema.pre('find', function () {
    this.select('role')
});


module.exports=model('Role', RoleSchema);