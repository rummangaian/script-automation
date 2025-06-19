const express = require('express');
const {transformBQ , refactorBq , flattenCols} = require('../controllers/transformController');

const router = express.Router();

router.post('/transform-bq', transformBQ);
router.post('/refactor-bq' , refactorBq)
router.post('/flatten-schema-cols' , flattenCols)

module.exports = router;
