const express = require('express');
const { migrateDataController , checkStatusController } = require('../controllers/migrationController');

const router = express.Router();

router.post('/data-migration', migrateDataController);
router.post('/migration-status' , checkStatusController)

module.exports = router;
