const {User, UserDetail, UserStock} = require("../models")

class UserController {
    static async getUserHome(req,res){
        try {
            res.render("Home")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
}

module.exports = UserController