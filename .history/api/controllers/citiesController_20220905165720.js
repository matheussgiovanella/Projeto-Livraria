const { Op } = require('sequelize');
const CityModel = require('../models/City.js');

class CityController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};

        res.json(await CityModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
    show = async (req, res, next) => {
        const city = await CityModel.findByPk(req.params.cityId);
        res.json(city);
    }
    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            await this._cityExists(data.name);
            const city = await CityModel.create(data);
            res.json(city);
        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }
    update = async (req, res, next) => {
        try {
            const id = req.params.cityId;
            const data = await this._validateData(req.body, id);
            await CityModel.update(data, {
                where: {
                    id: id
                }
            });
            res.json(await CityModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    delete = async (req, res, next) => {
        await CityModel.destroy({
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
        return city;
    }
    _cityExists = async (name) => {
        const cities = await CityModel.findAll({
            where: {
                [Op.notILike]: `${name}`
            }
        });
        if (cities.length == 0) {
            return false;
        } else {
            throw new Error(`The city "${name}" already exists`);
        }
    }
}

module.exports = new CityController();