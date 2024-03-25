'use strict';
const {
  Model
} = require('sequelize');
const db = require("../models");

const Role  = db.role;
module.exports = (sequelize, DataTypes) => {
class Permission extends Model {

    static associate (models) {
        // define association here

        Permission.belongsToMany(models.Role, {through: 'RolePermission', foreignKey: 'permission_id', as: 'roles'})
    }

}


Permission.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    permission_name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Permission already exists',
          }
    },
    permission_description: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    permission_on_resource: {
        type: DataTypes.STRING(128),
        allowNull: true, 
    },
    created_by: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Permission',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});
return Permission;
};

