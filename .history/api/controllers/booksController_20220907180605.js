const { Op } = require('sequelize');
const BookModel = require('../models/Books.js');
const Category = require('../models/Categories.js');
const Publisher = require('../models/Publisher.js');

class BookController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};

        res.json(await BookModel.findAll({
            include: {
                model: Publisher
            },
            include: {
                model: Category
            },
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
    show = async (req, res, next) => {
        const book = await BookModel.findByPk(req.params.bookId, {
            include: {
                model: Publisher,
                model: Category
            }
        });
        res.json(book);
    }
    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const book = await BookModel.create(data);
            res.json(book);
        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }
    update = async (req, res, next) => {
        try {
            const id = req.params.bookId;
            const data = await this._validateData(req.body, id);
            await BookModel.update(data, {
                where: {
                    id: id
                }
            });
            res.json(await BookModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    delete = async (req, res, next) => {
        await BookModel.destroy({
            where: {
                id: req.params.bookId
            }
        });
        res.json({});
    }
    _validateData = async (data, id) => {
        const attributes = ['title', 'author', 'publication_year', 'pages', 'category_id', 'publisher_id'];
        const book = {};

        for (const attribute of attributes) {

            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }
            book[attribute] = data[attribute];
        }
        return book;
    }
}

module.exports = new BookController();