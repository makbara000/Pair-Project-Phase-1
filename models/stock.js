'use strict';
const {
  Model
} = require('sequelize');
const formatCurrency = require('../helper/formatCurrency');
const { generateStockCode } = require('../helper/randomStockCode');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    get money(){
      return formatCurrency(this.price)
    }
  }
  Stock.init({
    name:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Name can't be empty"
        }
      }
    },
    description:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Description can't be empty"
        }
      }
    },
    price:{
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: "Price can't be empty"
        }
      }
    },
    code:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Code can't be empty"
        }
      }
    },
    type:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Type can't be empty"
        }
      }
    },
    Lot:{
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: "Lot can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Stock',
  });
  Stock.beforeCreate( (Stock, options) => {
    Stock.code = generateStockCode()
  });
  return Stock;
};