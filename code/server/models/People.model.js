'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class People extends Model {

}
People.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    first_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    project_title: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    job_type: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    university: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    profile_pic_url: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING(150),
        allowNull: true
    }
   
}, {
    sequelize,
    modelName: 'people',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
return People;
};

