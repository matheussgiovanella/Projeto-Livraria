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
        console.log(req.body)
        try {
            const data = await this._validateData(req.body);
            const user = await UserModel.create(data);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    _validateData = async (data, id) => {
        const attributes = ['name', 'sex', 'age', 'email', 'password'];
        const user = {};
        
        for (const attribute of attributes) {
            
            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }
            user[attribute] = data[attribute];
        }

        if (await this._checkIfEmailExists(user.email, id)) {
            throw new Error(`The user with mail address "${user.email}" already exists.`);
        }
        console.log(user)
        return user;
    }
    _checkIfEmailExists = async (email, id) => {
        const where = {
            email: email
        };

        if (id) {
            where.id = { [Op.ne]: id }; // WHERE id != id
        }

        const count = await UserModel.count({
            where: where
        });

        return count > 0;
    }
}

module.exports = new UserController();