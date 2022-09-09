const { DataTypes, Model } = require('sequelize');
const db = require('../db/index.js');

class State extends Model {


}

State.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    province: {
        type: DataTypes.CHAR(2),
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'State',
    tableName: 'states',
    timestamps: false
});

//User.sync({ force: true });

module.exports = State;