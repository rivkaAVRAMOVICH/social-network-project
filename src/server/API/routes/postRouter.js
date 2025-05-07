const express = require('express');
const router = express.Router();
const Controller = require('../controller');
// מסלול GET שמחזיר רשימת משתמשים
router.get('/:table', async (req,res)=>{
    const { table } = req.params;
    const controller = Controller.getController(table);
  
    if (!controller || !controller.getAll) {
      return res.status(404).json({ error: 'Entity not found' });
    }

    try {
      const data = await controller.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});