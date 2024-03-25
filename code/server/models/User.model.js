'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class User extends Model {

    static associate(models) {
        User.belongsTo(models.Role, {
          foreignKey: 'role_id'
        });
      }

}

User.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    hash: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    salt: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_superuser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    last_name: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    is_staff: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    date_joined: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    first_name: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});
return User;
};

