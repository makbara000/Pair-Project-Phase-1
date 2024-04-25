const session = require("express-session")

module.exports = (req, res, next) =>{
    console.log(req.sessions)
    if(req,session.email){
        return res.redirect("/login")
    }
}