const express = require('express');
const router = express.Router();
const Controller = require('../controller');

router.put('/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    const controller = Controller.getController(table);
  
    if (!controller || !controller.update) {
      return res.status(404).json({ error: 'Entity not found' });
    }
  
    try {
      const data = await controller.update(id, req.body);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
 