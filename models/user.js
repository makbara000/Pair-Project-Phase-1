'use strict';

const { hashSync } = require('bcryptjs');
const {Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Email can't be empty"
        },
        isEmail:{
          msg: "Email needs to be in email format"
        }
      }
    }, 
    password:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "password can't be empty"
        }
      }
    }, 
    role:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Role can't be empty"
        }
      }
    }, 
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate( (instance, options) => {
    instance.password = hashSync(instance.password)
  });
  return User;
};