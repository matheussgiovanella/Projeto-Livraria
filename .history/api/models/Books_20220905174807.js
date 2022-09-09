const { DataTypes, Model } = require('sequelize');
const db = require('../db/index.js');

class Book extends Model {


}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    sex: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(45),
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Book',
    tableName: 'books',
    timestamps: false
});

module.exports = Book;