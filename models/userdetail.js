'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserDetail.init({
    name:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Name can't be empty"
        }
      }
    }, 
    birthDate:{
      type: DataTypes.DATE,
      validate:{
        notEmpty:{
          msg: "Birth date can't be empty"
        }
      }
    }, 
    gender:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Gender can't be empty"
        }
      }
    }, 
    phoneNumber:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Phone number can't be empty"
        }
      }
    }, 
    UserId:{
      type: DataTypes.INTEGER, //addedColumn
      validate:{
        notEmpty:{
          msg: "UserId can't can't be empty"
        }
      }
    }, 
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};