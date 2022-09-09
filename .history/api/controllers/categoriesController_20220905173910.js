const { Op } = require('sequelize');
const CategoryModel = require('../models/City.js');

class CategoryController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};

        res.json(await CategoryModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
    show = async (req, res, next) => {
        const city = await CategoryModel.findByPk(req.params.cityId);
        res.json(city);
    }
    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const city = await CategoryModel.create(data);
            res.json(city);
        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }
    update = async (req, res, next) => {
        try {
            const id = req.params.cityId;
            const data = await this._validateData(req.body, id);
            await CategoryModel.update(data, {
                where: {
                    id: id
                }
            });
            res.json(await CategoryModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    delete = async (req, res, next) => {
        await CategoryModel.destroy({
            where: {
                id: req.params.cityId
            }
        });
        res.json({});
    }
    _validateData = async (data, id) => {
        const attributes = ['name', 'states_id'];
        const city = {};

        for (const attribute of attributes) {

            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }
            city[attribute] = data[attribute];
        }
        if (await this._cityExists(city.name, id)) {
            throw new Error(`The city with name "${city.name}" already exists.`);
        }
        return city;
    }
    _cityExists = async (name, id) => {
        const where = {
            name: name
        };

        if (id) {
            where.id = { [Op.ne]: id }; // WHERE id != id
        }

        const count = await CategoryModel.count({
            where: where
        });

        return count > 0;
    }
}

module.exports = new CityController();