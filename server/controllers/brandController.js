const { Brand } = require('../models/models');
const { UniqueConstraintError } = require('sequelize');

class BrandController {
    async create(req, res) {
        const { name } = req.body;
        try {
            const brand = await Brand.create({ name });
            return res.json(brand);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                return res.status(422).json({ message: `Brand "${name}" already exists.` });
            }
            return res.status(500).json({ message: 'An error occurred while adding the brand.' });
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }
}

module.exports = new BrandController();

// Path: server/controllers/typeController.js