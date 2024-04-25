const {User, UserDetail, UserStock, Stock} = require("../models")

class AdminController {
    static async adminHome(req, res){
        try {
            let data = await Stock.findAll()
            res.render("Admin", {data})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
}

module.exports = AdminController