const interior = require("../models/interiorSchema");
const portfolio = require("../models/portfolioSchema");
const ApiError = require("../exceptions/apiError.js");


const removeFileFromDb = async (id)=>{

    try {
        const int = await interior.find({footerImage:id}).populate('footerImage');
        const port = await portfolio.find({footerImage:id}).populate('footerImage');
        const doc =  function (){
            if (int){return interior}else if (port){return portfolio}else {
                return  ApiError.BadRequest('Image is not exist');
            }
        }
        if (doc() instanceof ApiError){
            throw  doc();
        }
        const option = await Promise.all([int,port]);

        let list ;
        for (let i = 0; i < option.length; i++) {
            if (option[i].length > 0){
                option[i].map((data)=>{
                    list = data
                })
            }
        }

        if (list) {
             await doc().updateOne(
                {footerImage: {$in: [id]}},
                {$pull: {footerImage: id}},
                {multi: true});
        }

        return list;
    }catch (error){
        throw error
    }


}

module.exports= {
    removeFileFromDb
}