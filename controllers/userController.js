const {User, UserDetail, UserStock, Stock} = require("../models")
const formatCurrency = require("../helper/formatCurrency")
const {Op}=require('sequelize')
class UserController {
    static async getUserHome(req, res){
        try {
            let {search} = req.query
            let option = {order: [['name', 'asc']]}
            if(req.query.search){
                option.where = {
                    name:{
                        [Op.iLike]: `%${req.query.search}%`
                    }
                }
            }
            let data = await Stock.findAll(option)
        
            
            res.render("Home", {data})
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
            let unpaidStock = await UserStock.findAll({    
                attributes: ['id', 'StockId', 'UserId', 'totalInvestment', 'paidLot'], 
                include:
                    {model: Stock,}
                ,
                where: {
                    UserId: req.session.user.id,
                    paidLot: false
                }
            });
            let paidStock = await UserStock.findAll({    
                attributes: ['id', 'StockId', 'UserId', 'totalInvestment', 'paidLot'], 
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
            res.render("Cart", {unpaidStock, paidStock, formatCurrency: formatCurrency})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async addToCart(req, res){
        let {id} = req.params
        try {
            console.log(req.session)
            let stockData = await Stock.findAll()
            let data = await UserStock.create({UserId: req.session.user.id, StockId: +id, totalInvestment: 1})
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
        try {
            let {id} = req.params
            let {tI, StockId} = req.query
            await UserStock.update({paidLot: true}, {where:{ id:id }})
            await Stock.decrement({Lot: tI}, {where:{ id: StockId}})
            res.redirect("/")
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    
    static async getUserDetail(req, res) {
        try {
            let { id } = req.session
            let user = await User.findAll({ 
                where: { id },
                include:{
                  model: UserStock
                }
              });

              const qr = `Si paling sobat Timothy`;

              qrcode.toDataURL(qr, (err, url) => {
                if (err) throw err;
                res.render('user', { title: 'User Details', user, qrCodeURL: url });
              });

          res.render("UserDetail", { user });
          
        } catch (error) {
          res.send(error);
          console.log(error)
        }
      }
      static async postUserDetail(req, res) {
        try {
          let { id } = req.params
          let { name, birthDate, gender,phoneNumber} = req.body;
          await UserProfile.update({ name, birthDate, gender,phoneNumber}, {
            where: {
              id: id
            }
          });
          res.redirect(`/user/${id}`);
        } catch (error) {
          res.send(error)
          console.log(error)
        }
      }
}

module.exports = UserController