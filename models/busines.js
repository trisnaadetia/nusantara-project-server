'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Busines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Busines.hasMany(models.Invest, { foreignKey: 'BusinesId' })
      Busines.belongsTo(models.User)
      Busines.belongsTo(models.Category)
    }
  };
  Busines.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'name must be required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'category must be required'
        }
      }
    },
    photo_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'photo_url must be required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'description must be required'
        }
      }
    },
    total_saham: {
      type: DataTypes.BIGINT,
      validate: {
        notEmpty: {
          msg: 'total saham must be required'
        }
      }
    },
    deviden: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'deviden must be required'
        }
      }
    },
    deviden_periode: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'deviden periode must be required'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'address must be required'
        }
      }
    },
    total_saham_update: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId must be required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Busines',
    hooks: {
      beforeCreate: (busines)=> {
        busines.total_saham_update = busines.total_saham
      }
    }
  });
  return Busines;
};