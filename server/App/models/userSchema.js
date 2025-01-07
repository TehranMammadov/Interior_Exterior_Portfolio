const mongoose= require("mongoose");
const {Schema, model} = mongoose


const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    role: {type: Schema.Types.ObjectId, ref: 'Role'},
    password: {type: String},
    resetPasswordToken: {type: String},
    lastLoginDate: {type: Date, default: null},
}, {  timestamps : true, autoCreate : false,strictPopulate: false});


module.exports = model('User', UserSchema);