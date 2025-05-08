const express = require('express');
const router = express.Router();
const Controller = require('../controller');

router.patch('/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    const updateData = req.body;
    const controller = require(`../../BL/${table}Manager.js`);
    
    if (!controller || !controller.update) {
    return res.status(404).json({ error: 'Entity not found or update not supported' });
    }
    
    try {
    const result = await controller.update(id, updateData);
    res.json(result);
    } catch (err) {
    res.status(500).json({ error: 'Server error' });
    }
    });
    module.exports = router;