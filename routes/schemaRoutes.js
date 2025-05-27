const express = require('express');
const { createSchemas } = require('../controllers/schemaController');

const router = express.Router();

router.post('/createSchemas', createSchemas);

module.exports = router;
