'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserStock.belongsTo(models.User),
      UserStock.belongsTo(models.Stock)
    }
  }
  UserStock.init({
    StockId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    totalInvestment: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    paidLot: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserStock',
  });
  return UserStock;
};