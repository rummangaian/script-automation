const express = require('express');
const router = express.Router();
const figmaController = require('../controllers/figmaController');

router.post('/push-figma-data', figmaController.formPayload);
router.get('/figma-data' , figmaController.getFigmaData)

module.exports = router;
