'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Publication extends Model {



}
Publication.init({
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
    modelName: 'norp_publication',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
return Publication;
};

