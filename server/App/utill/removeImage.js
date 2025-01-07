const fs = require("fs/promises");
const ApiError= require("../exceptions/apiError.js");

const removeImage = async (files)=>{
     const list = [];
     if (files.poster){
         files.poster.map((doc)=>{
             list.push('public/'+doc.filename)
         });
     }
     if (files.headerImage){
         files.headerImage.map((doc)=>{
             list.push('public/'+doc.filename)
         })
     }
     if (files.imageAfterParagraph){
         files.imageAfterParagraph.map((doc)=>{
             list.push('public/'+doc.filename)
         })
     }
     if (files.footerImage){
         files.footerImage.map((doc)=>{
             list.push('public/'+doc.filename)
         })
     }
    for (const path of list) {
        await  fs.unlink(path).catch((error)=>{
            if (error) throw ApiError.BadRequest('Image path not founded')
        })
    }
}

module.exports={
    removeImage
}