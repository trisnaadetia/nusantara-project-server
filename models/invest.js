'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invest.belongsTo(models.Busines, { foreignKey: 'BusinesId' })
      Invest.belongsTo(models.User)
    }
  };
  Invest.init({
    BusinesId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    total_invest: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'total invest must be required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Invest',
    hooks: {
      beforeCreate: (invest) => {
        invest.status = 'pending'
      }
    }
  });
  return Invest;
};