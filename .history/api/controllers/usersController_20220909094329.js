const { Op } = require('sequelize');
const UserModel = require('../models/User.js');
const logs = require('../logs.js');

class UserController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};
        let logIn = false;

        if (params.email) {
            where.email = params.email
            if (params.password) {
                where.password = params.password
                logIn = true;
            }
        }
        const users = await UserModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        });
        if (logIn) {
            if (users[0]) {
                const user = users[0].dataValues.email;

                const action = `User ${user} logged in!`;
                await logs.add(action);
            }
        }
        res.json(users);
    }
    show = async (req, res, next) => {
        const user = await UserModel.findByPk(req.params.userId);
        res.json(user);
    }
    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const user = await UserModel.create(data);
            const action = `User ${user.dataValues.email} created!`
            await logs.add(action);
            res.json(user);
        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }
    update = async (req, res, next) => {
        try {
            const id = req.params.userId;

            const data = await this._validateData(req.body, id);
            const oldUser = await UserModel.findByPk(id);

            await UserModel.update(data, {
                where: {
                    id: id
                }
            });
            const newUser = await UserModel.findByPk(id);
            const action = `User ${oldUser.dataValues.email} updated! -> ${newUser.dataValues.email}`
            await logs.add(action);
            res.json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    delete = async (req, res, next) => {
        console.log(id)
        try {
            const id = req.params.userId;
            const user = await UserModel.findByPk(id);
            console.log(user)
            await UserModel.destroy({
                where: {
                    id: id
                }
            });
            const action = `User ${user.dataValues.email} was deleted!`;
            await logs.add(action);
            res.json({});
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

        return user;
    }
    _checkIfEmailExists = async (email, id) => {
        console.log(email)
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