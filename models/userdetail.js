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
      this: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Name can't be empty"
        }
      }
    }, 
    birthDate:{
      this: DataTypes.DATE,
      validate:{
        notEmpty:{
          msg: "Birth date can't be empty"
        }
      }
    }, 
    gender:{
      this: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Gender can't be empty"
        }
      }
    }, 
    phoneNumber:{
      this: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Phone number can't be empty"
        }
      }
    }, 
    UserId:{
      this: DataTypes.INTEGER, //addedColumn
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