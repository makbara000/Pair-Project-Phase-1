module.exports = (req, res, next) =>{
    // console.log(req.session)
    if(req.session.user.role !== "admin"){
        return res.send("welp ya not an admin")
    }
    next()
}