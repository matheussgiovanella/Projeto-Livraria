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
            res.json(await StateModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new LogController();