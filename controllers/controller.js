
const { compareSync } = require("bcryptjs")
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
            let data = await User.create({email, password, role:"User"}) 
            let detail = await UserDetail.create({name, birthDate, gender, phoneNumber, UserId:data.id})
            res.redirect("./login")
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                let err = error.errors.map((e)=>e.message)
                console.log(err)
                res.send(error.errors[0].message)    
            } else {
                res.send(error)
                console.log(error)
            }
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
        let {email, password} = req.body
        try {
            let user = await User.findOne({where: {email}})
            if(!user) throw new Error("invalid user")
            let passwordMatch = compareSync(password, user.password)
            if(!passwordMatch) throw new Error("Invalid password")
            req.session.user = user.toJSON();
            // console.log(req.session.user)
            // res.send(user)
            res.redirect("/")
        } catch (error) {
            res.send(error.message)
            console.log(error)
        }
    }
    static async logOut(req, res){
        req.session.destroy((err))
        try {
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    
}

module.exports = Controller