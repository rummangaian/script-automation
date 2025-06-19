const express = require('express');
const { createSchemas , createSchemaPayload  , updateSchemaDefinitionAuto} = require('../controllers/schemaController');

const router = express.Router();

router.post('/create-schemas', createSchemas);
router.post('/schema-payload' , createSchemaPayload)
router.post('/schema-update-auto' , updateSchemaDefinitionAuto)

module.exports = router;
