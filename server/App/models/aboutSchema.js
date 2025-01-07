const mongoose = require("mongoose");
const {Schema, model} = mongoose

const aboutSchema = new Schema(
    {
            azTitle: String,
            enTitle: String,
            ruTitle: String,
            headerImage: {type: Schema.Types.ObjectId, ref: "Image"},
            azQuote:String,
            enQuote:String,
            ruQuote:String,
            content: [{type: Schema.Types.ObjectId, ref: "AboutContent"}]/*,
            module : [{type: Schema.Types.ObjectId, ref: "Module"}]*/
    }, {timestamps: true}
);

aboutSchema.pre('findOne', function () {
        this.select({createdAt:0,updatedAt:0,__v:0})
});

aboutSchema.pre('find', function () {
        this.select({createdAt:0,updatedAt:0,__v:0})
});

module.exports= model('About', aboutSchema);