
module.exports = (req, res, next) =>{
    console.log(req.session)
    if(!req.session.user){
        return res.redirect("/login")
    }
    next()
}