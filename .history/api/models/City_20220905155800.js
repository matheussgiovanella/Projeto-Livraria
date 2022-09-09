const { DataTypes, Model } = require('sequelize');
const db = require('../db/index.js');
const State = require('./State.js');

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

City.belongsTo(State, {
    foreignKey: 'states_id',
    sourceKey: 'id'
});

City.sync({ force: true });

module.exports = City;