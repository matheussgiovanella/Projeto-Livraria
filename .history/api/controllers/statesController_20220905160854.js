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

        if (params.id) {
            where.id = params.id
        }
        
        res.json(await UserModel.findAll({
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
}

module.exports = new StateController();