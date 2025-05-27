

const { dataMigrate, checkStatusMigration } = require("../services/dataMigrationService.js");

// Controller for data migration request
const migrateDataController = async (req, res) => {
  const { schemaIds } = req.body;

  if (!schemaIds || !Array.isArray(schemaIds)) {
    return res.status(400).json({ error: "schemaIds must be a valid array" });
  }

  try {
    await dataMigrate(schemaIds);
    res.status(200).json({ message: "Data migration request submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong during migration." });
  }
};

// Controller for checking migration status
const checkStatusController = async (req, res) => {
  const { schemaIds } = req.body;

  if (!schemaIds || !Array.isArray(schemaIds)) {
    return res.status(400).json({ error: "schemaIds must be a valid array" });
  }

  try {
    const result = await checkStatusMigration(schemaIds);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check status." });
  }
};

module.exports = {
  migrateDataController,
  checkStatusController,
};
