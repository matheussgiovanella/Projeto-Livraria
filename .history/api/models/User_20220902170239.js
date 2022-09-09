const { DataTypes, Model } = require('sequelize');
const db = require('../db/index.js');

class User extends Model {


}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
})