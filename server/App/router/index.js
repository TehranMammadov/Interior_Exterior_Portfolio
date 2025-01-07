const blogRouter = require('./public/blogRouter.js');
const $blogRouter = require('./private/blogRouter.js');
const formRouter = require('./public/formRouter.js');
const userRouter = require("./public/userRouter.js");
const $userRouter = require("./private/userRouter.js");
const portfolioRouter = require("./public/portfolioRouter.js");
const $portfolioRouter = require("./private/portfolioRouter.js");
const $mainRouter = require("./private/mainRouter.js");
const mainRouter = require("./public/mainRouter.js");
const aboutRouter= require("./public/aboutRouter.js");
const $aboutRouter = require("./private/aboutRouter.js");
const $messageRouter = require("./private/messageRouter.js");
const $videoRouter = require("./private/videoRouter.js");
const videoRouter = require("./public/videoRouter.js");
const categoryRouter = require("./public/categoryRouter.js");
const $categoryRouter = require("./private/categoryRouter.js");
const fileRouter = require("./private/fileRouter.js");
const interiorRouter  = require("./public/interiorRouter");
const $interiorRouter =  require("./private/interiorRouter");

module.exports = (app) => {
    // public
    app.use('/api/blog',blogRouter)
    app.use('/api/portfolio',portfolioRouter)
    app.use('/api/form',formRouter)
    app.use('/api/user',userRouter)
    app.use("/api/category", categoryRouter)
    app.use('/api/main',mainRouter)
    app.use('/api/about',aboutRouter)
    app.use('/api/interior',interiorRouter);
    app.use('/api/video',videoRouter);
    // private
    app.use('/api/admin/file',fileRouter);
    app.use('/api/admin/blog',$blogRouter)
    app.use('/api/admin/portfolio',$portfolioRouter)
    app.use('/api/admin/user',$userRouter)
    app.use("/api/admin/category", $categoryRouter)
    app.use('/api/admin/main',$mainRouter)
    app.use('/api/admin/about',$aboutRouter)
    app.use('/api/admin/message',$messageRouter)
    app.use('/api/admin/video',$videoRouter)
    app.use('/api/admin/interior',$interiorRouter);

}



