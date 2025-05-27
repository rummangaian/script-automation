const express = require('express');
const router = express.Router();
const figmaController = require('../controllers/figmaController');

router.post('/formPayload', figmaController.formPayload);

module.exports = router;
