const { Op } = require('sequelize');
const UserModel = require('../models/User.js');

class UserController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';

        res.json(await UserModel.findAll({
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const user = await UserModel.create(data);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();