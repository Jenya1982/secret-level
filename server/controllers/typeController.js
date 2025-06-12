const {Type} = require('../models/models')
const { UniqueConstraintError } = require('sequelize');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        try {
        const type = await Type.create({name})
        return res.json(type)
        }
        catch(error) {
            if (error instanceof UniqueConstraintError) {
                return res.status(422).json({ message: `Type "${name}" already exists.` });
            }
            return res.status(500).json({ message: 'An error occurred while adding the type.' });
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

module.exports = new TypeController()

// Path: server/routes/typeRouter.js