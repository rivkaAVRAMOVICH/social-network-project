const express = require('express');
const router = express.Router();
const Controller = require('../controller');
// מסלול GET שמחזיר רשימת משתמשים
router.get('/:table', async (req,res)=>{
    const { table } = req.params;
    const controller =require(`../../BL/${table}Manager.js`);
  
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
router.get('/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    const controller = require(`../../BL/${table}Manager.js`);
  
    if (!controller || !controller.getById) {
      return res.status(404).json({ error: 'Entity not found' });
    }
  
    try {
      const data = await controller.getById(id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.get('/:table/:id/:subtable', async (req, res) => {
    const { id, subtable } = req.params;
    const controller =require(`../../BL/${subtable}Manager.js`);
  
    if (!controller || !controller.getById) {
      return res.status(404).json({ error: 'Entity not found' });
    }
  
    try {
       
      const data = await controller.getAll(id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = router;