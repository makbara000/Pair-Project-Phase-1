const formatCurrency = require("../helper/formatCurrency");
const {User, UserDetail, UserStock, Stock} = require("../models")

class AdminController {
    static async adminHome(req, res){
        try {
            // let { deleted } = req.query
            // let { id } = req.session
    
            let data = await Stock.findAll({
                order: [["name"]],
            });
            
            // res.send(data)
            res.render("Admin", {data});

            // let data = await Stock.findAll()
            // res.render("Admin", {data})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async getAddStockProduct(req, res){
        try {
            let data = await Stock.findAll()
            res.render("AdminAdd", {data})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async postAddStockProduct(req, res){
        try {
            let { name, description, price, type, Lot }=req.body
            let newStock = await Stock.create({ name, description, price, type, Lot })
            res.redirect("/admin")
        } catch (error) {
          if (error.name === 'SequelizeValidationError') {
                let err = error.errors.map((e)=>e.message)
                console.log(err)
                res.send(err)    
            } else {
                res.send(error)
                console.log(error)
            }
        }
    }

    static async getEditStockProduct(req, res){
        try {       
            let {id} = req.params
            let data = await Stock.findByPk(id)
            res.render("AdminEdit", {data, formatCurrency})
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    static async postEditStockProduct(req, res){
        try {
            let {id} = req.params
            let {name, description, price, type, Lot } = req.body;            
            await Stock.update({ name, description, price, type, Lot }, {
              where:{
                id
              }
            });
          
            res.redirect("/Admin");
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    
    static async deleteStockProduct(req, res){
        try {
        let {id} = req.params
        let deleted = await Stock.findByPk(id)
        await Stock.destroy({
            where: { id }
        })
        console.log(deleted)
        res.redirect(`/admin?deleted=${deleted.name}`)

      

            
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
}

module.exports = AdminController