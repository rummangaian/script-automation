const express = require('express');
const { createSchemas , createSchemaPayload } = require('../controllers/schemaController');

const router = express.Router();

router.post('/create-schemas', createSchemas);
router.post('/schema-payload' , createSchemaPayload)

module.exports = router;
