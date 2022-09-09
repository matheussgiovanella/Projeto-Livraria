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
        const where = {};

        if (params.titulo) {
            where.titulo = {
                [Op.iLike]: `%${params.titulo}%`
            };
        }
        if (params.data) {
            where.dataHoraInicio = params.data
        }
        if (params.modalidade) {
            where.modalidade = {
                [Op.iLike]: `%${params.modalidade}%`
            }
        }
        if (params.local) {
            where.local = {
                [Op.iLike]: `%${params.local}%`
            }
        }
        if (params.valorIngresso) {
            where.valorIngresso = params.valorIngresso;
        }
        res.json(await EventoModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
}

module.exports = new UserController();