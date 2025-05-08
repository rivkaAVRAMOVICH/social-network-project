const express = require('express');
const router = express.Router();
const Controller = require('../controller');
// מסלול GET שמחזיר רשימת משתמשים
router.delete('/:table/:id', async (req,res)=>{
    const { table, id } = req.params;
    const controller = require(`../../BL/${table}Manager.js`);
  
    if (!controller || !controller.deleteById) {
      return res.status(404).json({ error: 'Entity not found' });
    }

    try {
      const data = await controller.deleteById(id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;