const { DataTypes, Model } = require('sequelize');
const db = require('../db/index.js');

class Log extends Model {


}

Log.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    date
})