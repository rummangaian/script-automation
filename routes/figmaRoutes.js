const express = require('express');
const router = express.Router();
const figmaController = require('../controllers/figmaController');

router.post('/push-parent-figma-data', figmaController.formPayload);
router.post('push-single-node-data' , figmaController.singleInstance)
router.get('/figma-data' , figmaController.getFigmaData)

module.exports = router;
