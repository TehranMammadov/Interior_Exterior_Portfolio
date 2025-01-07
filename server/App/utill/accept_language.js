
module.exports= (req)=>{
    let lang = req.headers["accept-language"];
    if (!["en","ru","az"].includes(lang) || !lang || lang === null){
        lang = "en";
    }
    return lang;
}