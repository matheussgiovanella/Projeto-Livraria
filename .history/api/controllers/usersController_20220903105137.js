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
}

module.exports = new UserController();