// const {User, UserDetail, UserStock, Stock} = require("../models")

class Controller {
    static async registerPath(req, res){
        try {
            res.render("Register")
        } catch (error) {
            res.send(error)
            // console.log(error)
        }
    }
    static async register(req, res){
        try {
            let {email, password, name, birthDate, gender, phoneNumber} = req.body
            res.send({email, password, name, birthDate, gender, phoneNumber, role:"User"})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
}

module.exports = Controller