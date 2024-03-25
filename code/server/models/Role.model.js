'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Role extends Model {

    /**
 * Helper method for defining associations.
 * This method is not a part of Sequelize lifecycle.
 * The `models/index` file will call this method automatically.
 */
    static associate (models) {
        // define association here
        Role.hasMany(models.User, {
            foreignKey: 'role_id',
            as: 'users'
          });
        Role.belongsToMany(models.Permission, {through: 'RolePermission', foreignKey: 'role_id', as: 'permissions'})
    }

}


Role.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    role_name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Role already exists',
          }
    },
    role_description: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    created_by: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});
return Role;
};

