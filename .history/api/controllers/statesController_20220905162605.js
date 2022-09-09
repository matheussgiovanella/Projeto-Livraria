const { Op } = require('sequelize');
const StateModel = require('../models/State.js');

class StateController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};

        res.json(await StateModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const state = await StateModel.create(data);
            res.json(state);
        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }
    update = async (req, res, next) => {
        try {
            const id = req.params.stateId;
            const data = await this._validateData(req.body, id);
            await StateModel.update(data, {
                where: {
                    id: id
                }
            });
            res.json(await StateModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    delete = async (req, res, next) => {
        await StateModel.destroy({
            where: {
                id: req.params.stateId
            }
        });
        res.json({});
    }
    _validateData = async (data, id) => {
        const attributes = ['name', 'province'];
        const state = {};

        for (const attribute of attributes) {

            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }
            state[attribute] = data[attribute];
        }
        return state;
    }
}

module.exports = new StateController();