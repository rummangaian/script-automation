const express = require('express');
const router = express.Router();
const figmaController = require('../controllers/figmaController');

router.post('/figma-data', figmaController.formPayload);

module.exports = router;
