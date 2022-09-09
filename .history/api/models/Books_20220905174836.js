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
    author: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    publication_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pages: {
        type: DataTypes.INTEGER,
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