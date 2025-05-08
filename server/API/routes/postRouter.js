const express = require('express');
const router = express.Router();
const Controller = require('../controller.js');

router.post('/login', async (req, res) => {
  try {
    const controller = require(`../../BL/AccessControlManager.js`);;

    if (!controller || !controller.login) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    console.log(req.body);
    const token = await controller.login(req.body); // שולח את name וה־password
    res.json({ token }); // מחזיר ללקוח את הטוקן
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
router.post('/register', async (req, res) => {
  try {
    const controller = require(`../../BL/AccessControlManager.js`);;
    if (!controller || !controller.register) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    const token = await controller.register(req.body); // שולח את name וה־password
    res.json({ token }); // מחזיר ללקוח את הטוקן
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
// מסלול GET שמחזיר רשימת משתמשים
router.post('/:table', async (req, res) => {
  const { table } = req.params;
  const controller = require(`../../BL/${table}Manager.js`);

  if (!controller || !controller.add) {
    return res.status(404).json({ error: 'Entity not found' });
  }

  try {
    const data = await controller.add(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' + err });
  }
});
module.exports = router;