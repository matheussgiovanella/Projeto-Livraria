const { DataTypes, Model } = require('sequelize');
const db = require('../db/index.js');
const City = require('./City.js');

class Publisher extends Model {


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

City.belongsTo(State, {
    foreignKey: {
        name: 'states_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    targetKey: 'id',
});

module.exports = City;