'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class RolePermission extends Model {



}


RolePermission.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    role_id: {
        type: DataTypes.STRING(128),
        allowNull: false,
        references: {         // User hasMany WorkingDays n:n
            model: 'Role',
            key: 'id'
          }
    },
    permission_id: {
        type: DataTypes.STRING(128),
        allowNull: false,
        references: {         // User hasMany WorkingDays n:n
            model: 'Permission',
            key: 'id'
          }
    }
}, {
    sequelize,
    modelName: 'RolePermission',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});
return RolePermission;
};

