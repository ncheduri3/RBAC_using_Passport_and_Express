'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Graph extends Model {
         /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Graph.init({
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        source: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        created_by: {
            type: DataTypes.STRING(150),
            allowNull: true
        } 
    }, {
        sequelize,
        modelName: 'norp_graph',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return Graph;
};

