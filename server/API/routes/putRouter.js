const express = require('express');
const router = express.Router();
const Controller = require('../controller');

router.put('/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    console.log("gg"+JSON.stringify(req.body));
     console.log("gg"+id);
    const controller = require(`../../BL/${table}Manager.js`);
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
  module.exports = router;
 