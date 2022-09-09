const { Op } = require('sequelize');
const LogModel = require('../models/Log.js');

class LogController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};

        res.json(await LogModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
    show = async (req, res, next) => {
        const log = await LogModel.findByPk(req.params.logId);
        res.json(log);
    }
    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const log = await LogModel.create(data);
            res.json(log);
        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }
    update = async (req, res, next) => {
        try {
            const id = req.params.logId;
            const data = await this._validateData(req.body, id);
            await LogModel.update(data, {
                where: {
                    id: id
                }
            });
            res.json(await LogModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    delete = async (req, res, next) => {
        await LogModel.destroy({
            where: {
                id: req.params.logId
            }
        });
        res.json({});
    }
    _validateData = async (data, id) => {
        const attributes = ['name', 'province'];
        const log = {};

        for (const attribute of attributes) {

            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }
            state[attribute] = data[attribute];
        }
        if (await this._stateNameExists(state.name, id)) {
            throw new Error(`The state with name "${state.name}" already exists.`);
        }
        if (await this._stateProvinceExists(state.province, id)) {
            throw new Error(`The state with province "${state.province}" already exists.`);
        }
        return state;
    }
}

module.exports = new LogController();