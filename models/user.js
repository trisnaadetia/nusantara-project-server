'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Busines)
      User.hasMany(models.Invest)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'username must be required'
        }
      }
    },
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'full_name must be required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email must be required'
        },
        isEmail: {
          msg: 'input must be format email'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password must be required'
        },
        len: {
          args: [6],
          msg: 'password length should be minimum 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
        user.role = 'investor'
      }
    }
  });
  return User;
};