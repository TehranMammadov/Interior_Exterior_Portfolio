const multer = require('multer');
const fs = require('fs/promises');
const {v4} = require('uuid');
const path = require("path");
const ApiError = require("../exceptions/apiError.js");
// const tinify = require("tinify");
// require('dotenv').config

// const ApiError = require('../exceptions/apiError');
// const winston = require('../logger/logger');

// tinify.key = process.env.tinify_key;

/**
 * Storage 
 * */ 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    },
});

/**
 *  Limits option 
*/ 
let limits = {
    fileSize: 10000 * 10000
}

/**
 *  File filter
*/ 

function fileFilter(req, file, cb) {
    let fileEnum = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
    if (!fileEnum.includes(file.mimetype)) {
        cb(ApiError.BadRequest('Yüklədiyiniz şəkilin formatı yalnışdır . Yalnız  PNG JPG JPEG WEBP formatında şəkillərdən istifadə edə bilərsiniz !'), false);
    }
    if (req.files.poster) {
       if (req.files.poster.length !== 1){
           cb(ApiError.BadRequest("Yalnız 1 ədəd Afişa şəkli yükləyə bilərsiniz" ))
       }
    }
    if (req.files) {
        for (const [key, value] of Object.entries(req.files)) {
           if (value.length > 16){
               cb(ApiError.BadRequest("Yeni şəkil yükləmə limiti 16 - dır !" ))
           }
        }
    }
    cb(null, true);
}


let uploadImages = multer({storage, limits, fileFilter}).fields([{name:'image',maxCount: 16},{ name: 'poster', maxCount: 16}, { name: 'headerImage', maxCount: 16 },{name:'footerImage',maxCount: 16},{name: 'imageAfterParagraph',maxCount: 16},{name: 'about',maxCount: 1},{name: 'about1',maxCount: 6},{name: 'about2',maxCount: 1},{name: 'about3',maxCount: 1}]);


const deleteOldImages = async (paths) => {
    if(typeof paths !== typeof []) {
        paths = [paths]
    }
    try {
        for(let path of paths){
            let newPath = 'public/' + path.split(process.env.URL)[1]
            await fs.unlink(newPath)
        }
    } catch (error) {
        throw ApiError.NotFoundException("Image is not founded in server")
    }
    
}

module.exports = {
    uploadImages,
    deleteOldImages
}

// export const compressImages = async (req, res, next) => {
//     winston.debug('multer.compression -- start');

//     for (let i = 0; i < req.files.length; i++) {
//         // First compression

//         try {
//             let source = tinify.fromFile(req.files[i].path);

//             await source.toFile(req.files[i].path.replace(req.files[i].originalname, `_optimized_${req.files[i].originalname}`));
//             // deleting the original file
//             await fs.unlink(req.files[i].path);
//             // replacing the path with compressed one
//             req.files[i].path = req.files[i].path.replace(req.files[i].originalname, `_optimized_${req.files[i].originalname}`)

//             // Second compression
//             let source2 = tinify.fromFile(req.files[i].path)
//             await source2.toFile(req.files[i].path.replace(`_optimized_${req.files[i].originalname}`, `_optimized_2_${req.files[i].originalname}`))

//             // deleting the 1st compressed image
//             await fs.unlink(req.files[i].path);
//             //replacing the path with 2nd compressed one
//             req.files[i].path = req.files[i].path.replace(`_optimized_${req.files[i].originalname}`, `_optimized_2_${req.files[i].originalname}`)
//         } catch (error) {
//             throw ApiError.GeneralException()
//         }


//     }


//     winston.debug('multer.compression -- success');
//     next();
// };