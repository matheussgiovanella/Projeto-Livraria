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

        if (params.exclude) {
            where.id = {
                [Op.ne]: params.exclude
            }
        }

        res.json(await StateModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
}