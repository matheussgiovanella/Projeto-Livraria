const { Op } = require('sequelize');
const StateModel = require('../models/State.sj');

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
}

module.exports = new StateController();