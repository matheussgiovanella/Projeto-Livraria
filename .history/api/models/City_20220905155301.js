const { DataTypes, Model } = require('sequelize');
const db = require('../db/index.js');

class City extends Model {


}

City.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.CHAR(45),
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'City',
    tableName: 'cities',
    timestamps: false
});

City.sync({ force: true });

module.exports = City;