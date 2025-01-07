const {
    get,
    getbyId,
    getOne,
    create,
    deleteOne,
    updateOne,
    createImage,
    findBlog,
    findAndUpdateImageById,
    findBlogsByCategory
} = require('../repository/blogRepository.js');
const {deleteOldImages} = require('./multerService.js')
const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");
const language = require("../language/language.js");
const enBlogDTO = require("../helper/enBlogDTO");
const azBlogDTO = require("../helper/azBlogDTO");
const ruBlogDTO = require("../helper/ruBlogDTO");
const {findImageById} = require("../repository/blogRepository");


const post = async(body,files,lang) => {
    logger.debug('blogService.post -- start');
    const {azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription,/* category,*/azContent, enContent, ruContent, url} = body
    let queryCreateBlog={azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription,/* category,*/azContent, enContent, ruContent, url};
    if (files.poster){
        let postArr = [];
        for (const img of files.poster) {
            let posterImagePath = process.env.URL + img.filename;
            const image = await createImage(posterImagePath);
            postArr.push(image._id);
        }
           new Promise(async (resolve, reject) => {
            resolve(queryCreateBlog.posterImage = postArr)
        });
    }

    const blog = await create(queryCreateBlog);
    if (!blog){
        logger.warn('blogService.post -- error');
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('blogService.post -- success');
    return language[lang].addBlogSuccessfullyMessage;
}




const update = async(body,files,lang) => {
    logger.debug('blogService.update -- success');
    const {id,azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription,/* category,*/azContent, enContent, ruContent, url} = body
    if(!id){
        logger.warn('blogService.post -- null param');
        throw ApiError.BadRequest(language[lang].blogNotExist)
    }
    let queryUpdateBlog={azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription,/* category,*/azContent, enContent, ruContent, url};
    const paths = [];
    const blogSchema = await findBlog(id);
    if (!blogSchema){
        throw ApiError.NotFoundException('Blog mövcud deyil')
    }
    let checkIfExist = false
    if(files.poster){
        for (const img of files.poster) {
            const posterImage = process.env.URL + img.filename;
            if (blogSchema.posterImage[0] != null) {
                const ifExist = await findImageById(blogSchema.posterImage[0]);
                if(ifExist){
                    checkIfExist = true;
                }
                const image = await findAndUpdateImageById(blogSchema.posterImage[0],{url:posterImage});
                paths.push(image._id)
            } else {
                checkIfExist = true;
                const newImage = await createImage(posterImage);
                paths.push(newImage._id);
            }
        }
    }
    if (paths.length > 0)
    {
        new Promise(async (resolve) => {
            resolve(queryUpdateBlog.posterImage = paths)
        });
    }
    const blog = await updateOne(id,queryUpdateBlog);
    if (!blog){
        logger.warn('blogService.update -- not founded');
        throw ApiError.GeneralException(language[lang].serverError);
    }
    logger.debug('blogService.update -- success');
    if(!checkIfExist)
        await deleteOldImages(paths)
    return language[lang].updateBlog;
}


const getAll = async(lang, getLang) => {
    logger.debug('blogService.getAll -- start');
    const blogs = await get();
    if (blogs.length === 0){
        logger.warn('blogService.getAll -- null param');
        throw ApiError.NotFoundException(language[lang].blogNotExist)
    }
    let dto;
    if (getLang === 'en') {
        dto = blogs.map((docs) => new enBlogDTO(docs))
    } else if (getLang === 'az') {
        dto = blogs.map((docs) => new azBlogDTO(docs))
    } else if (getLang === 'ru') {
        dto = blogs.map((docs) => new ruBlogDTO(docs))
    } else {
        dto = blogs
    }
    logger.debug('blogService.getAll-- success');
    return dto;
}


/*const blogsByCategory = async(lang,category) => {
    logger.debug('blogService.blogsByCategory -- start');
    const blogs = await findBlogsByCategory(category);
    if (blogs.length === 0){
        logger.warn('blogService.getAll -- null param');
        throw ApiError.NotFoundException(language[lang].blogNotExist)
    }
    logger.debug('blogService.blogsByCategory -- success');
    return blogs;
}*/


const getBlogById = async(lang,id, getLang) => {
    logger.debug('blogService.getAll -- start');
    const blog = await getbyId(id);
    if (!blog){
        logger.warn('blogService.getAll -- null param');
        throw ApiError.NotFoundException(language[lang].blogNotExist)
    }
    let dto;
    if (getLang === 'en') {
        dto = new enBlogDTO(blog)
    } else if (getLang === 'az') {
        dto = new azBlogDTO(blog)
    } else if (getLang === 'ru') {
        dto = new ruBlogDTO(blog)
    } else {
        dto = blog
    }
    logger.debug('blogService.getAll-- success');
    return dto;
}


const getFiltereds = async(filter,lang) => {
    logger.debug('blogService.getFiltereds-- start');
    const filteredBlogs = await get(filter)
    if (filteredBlogs.length === 0){
        logger.warn('blogService.filteredBlogs -- null param');
        throw ApiError.NotFoundException('Blog mövcud deyil')
    }
    logger.debug('blogService.getFiltereds-- success');
    return filteredBlogs
}
const getFiltered = async(filter,lang) =>{
    logger.debug('blogService.getFiltered-- start');
    const filteredBlog = await getOne(filter)
    if (!filteredBlog){
        logger.warn('blogService.filtered -- null param');
        throw ApiError.NotFoundException(language[lang].blogNotExist)
    }
    logger.debug('blogService.getFiltered-- success');
    return filteredBlog
}

const _delete = async (id,lang) => {
    try {
        logger.debug('blogService._delete -- start');
        const deletedBlog = await deleteOne(id);
        if (!deletedBlog){
            logger.warn('blogService._delete -- null param');
            throw ApiError.GeneralException(language[lang].serverError);
        }

        const poster = deletedBlog.posterImage.map((doc)=>{
            return doc.url;
        });
        let paths = [];
        paths.push(...poster);
        await deleteOldImages(paths);
        logger.debug('blogService._delete -- success');
        return language[lang].blogRemoved
    }catch (e) {
        throw e
    }
}


module.exports = {
    post,
    getAll,
    getFiltereds,
    getFiltered,
    _delete,
    update,
    getBlogById,
    //blogsByCategory
}