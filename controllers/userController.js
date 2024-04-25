const {User, UserDetail, UserStock, Stock} = require("../models")

class UserController {
    static async getUserHome(req,res){
        try {
            let data = await Stock.findAll()
            // res.send(data)
            res.render("Home", {data})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
}

module.exports = UserController