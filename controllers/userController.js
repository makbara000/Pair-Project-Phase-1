const {User, UserDetail, UserStock, Stock} = require("../models")
const formatCurrency = require("../helper/formatCurrency")
class UserController {
    static async getUserHome(req, res){
        try {
            let {filter} = req.query
            let option = {order: [['name', 'asc']]}
            if(filter){
                option.where = {type: filter}
            }
            let data = await Stock.findAll(option)
            // res.send(data)
            res.render("Home", {data})
            console.log({filter})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async postUserHome(req, res){
        try {
            let data = await Stock.findAll()
            // res.send(data)
            res.render("Home", {data})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async getCart(req, res){
        try {
            let unpaidStock = await UserStock.findAll({
                include: [
                    {
                        model: Stock,
                    }
                ],
                where: {UserId:req.session.user.id}
            })
            // res.send({unpaidStock})
            res.render("Cart", {unpaidStock, formatCurrency: formatCurrency})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async addToCart(req, res){
        let {id} = req.params
        try {
            console.log(req.session)
            let data = await UserStock.create({UserId: req.session.user.id, StockId: +id, totalInvestment: 1})
            let stockData = await Stock.findByPk(id)
            stockData.decrement("Lot")
            // res.send(req.params)
            res.redirect("/")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async increaseLotCart(req, res){
        try {
            let {id} = req.params
            await UserStock.increment({totalInvestment: 1}, {where: {id:id}})
            res.redirect("/cart")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async decreaseLotCart(req, res){
        try {
            let {id} = req.params
            await UserStock.decrement({totalInvestment: 1}, {where: {id:id}})
            res.redirect("/cart")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async payLotCart(req, res){
        
    }
    
}

module.exports = UserController