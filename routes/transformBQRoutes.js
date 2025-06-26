const express = require('express');
const {transformBQ , refactorBq , flattenCols , refactorAdhoc} = require('../controllers/transformController');

const router = express.Router();

router.post('/transform-bq', transformBQ);
router.post('/refactor-bq' , refactorBq)
router.post('/flatten-schema-cols' , flattenCols)
router.post('/refactor-adhocs' , refactorAdhoc)

module.exports = router;
