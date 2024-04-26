const {User, UserDetail, UserStock, Stock} = require("../models")
const formatCurrency = require("../helper/formatCurrency")
const {Op}=require('sequelize')
const fluctuator = require("../helper/fluctuator")
const qrcode = require('qrcode');
const stock = require("../models/stock");
class UserController {
    static async getUserHome(req, res){
        try {
            let id = req.session.user.id
            let {search} = req.query
            // let option = {order: [['name', 'asc']]}
            // if(req.query.search){
            //     option.where = {
            //         name:{
            //             [Op.iLike]: `%${req.query.search}%`
            //         }
            //     }
            // }
            // let data = await Stock.findAll(option)
            let data = await Stock.searchStock(id, search)
            res.render("Home", {data, id})
            console.log({search})
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
            let id = req.session.user.id
            let unpaidStock = await UserStock.findAll({    
                attributes: ['id', 'StockId', 'UserId', 'totalStock', 'totalInvestment', 'paidLot'], 
                include:
                    {model: Stock,}
                ,
                where: {
                    UserId: req.session.user.id,
                    paidLot: false
                }
            });
            let paidStock = await UserStock.findAll({    
                attributes: ['id', 'StockId', 'UserId','totalStock', 'totalInvestment', 'paidLot', 'value'], 
                include:
                    {model: Stock,}
                ,
                where: {
                    UserId: req.session.user.id,
                    paidLot: true
                }
            }); 

            
            console.log(unpaidStock, paidStock)
            // res.send({unpaidStock})
            res.render("Cart", {unpaidStock, paidStock, formatCurrency, fluctuator, id})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    
    static async addToCart(req, res){
        let {id} = req.params
        try {
            console.log(req.session)
            let stockData = await Stock.findByPk(id)
            let data = await UserStock.create({UserId: req.session.user.id, StockId: +id, totalInvestment: stockData.price, value: 0, totalStock: 1})
            // let stockData = await Stock.findByPk(id)
            // stockData.decrement("Lot")
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
            await UserStock.increment({totalStock: 1}, {where: {id:id}})
            res.redirect("/cart")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async decreaseLotCart(req, res){
        try {
            let {id} = req.params
            await UserStock.decrement({totalStock: 1}, {where: {id:id}})
            res.redirect("/cart")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async payLotCart(req, res){
        try {
            let {id} = req.params
            let {tI, StockId} = req.query
            let data = await UserStock.findByPk(id)
            let totalMoney = data.totalInvestment * data.totalStock
            console.log(totalMoney)
            let paid = await UserStock.update({paidLot: true, totalInvestment: totalMoney, value: totalMoney}, {where:{ id:id }});
           
            await Stock.decrement({Lot: tI}, {where:{ id: StockId}})
            res.redirect("/")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    
    static async getUserDetail(req, res) {
        try {
            let {id}  = req.params
            let user = await UserDetail.findAll({where:{
                UserId: id
            }});
            console.log({id,user})
            
            const url ='https://github.com/Aitemaa/Friend-Feed-Pair-Project-Hacktiv8.git'
            
            qrcode.toDataURL('https://github.com/Aitemaa/Friend-Feed-Pair-Project-Hacktiv8.git', function (err, url) {
                if (err) throw err;
                console.log(url)
                res.render('UserDetail',{id, user, qrCodeURL: url});
            })
        } catch (error) {
          res.send(error);
          console.log(error)
        }
      }

}

module.exports = UserController