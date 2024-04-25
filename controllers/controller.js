const {User, UserDetail, UserStock, Stock} = require("../models")

class Controller {
    static async getRegisterForm(req, res){
        try {
            res.render("Register")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async postRegisterForm(req, res){
        try {
            let {email, password, name, birthDate, gender, phoneNumber} = req.body
            res.send({email, password, name, birthDate, gender, phoneNumber, role:"User"})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }

    static async getLoginForm(req, res){
        try {
            res.render("Login")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }

    static async postLoginForm(req, res){
        try {
            let {email, password} = req.body
            res.send({email, password, role:"User"})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    
}

module.exports = Controller