const axiosInstance = require('../config/axiosInstance');
const generateSchemaPayload = require('../utils/generateSchemaPayload');
const {createPayload , updateSchemaDefAuto} = require("../utils/attributePayload")

let schemaStore = {};

exports.createSchemas = async (req, res) => {
  const { umlClasses } = req.body;
  const successData = {};
  const errors = {};

  try {
    const promises = umlClasses.map(async (umlClass) => {
      const schemaName = umlClass.className.toLowerCase();
      if (schemaStore[schemaName]) return { name: schemaName, schemaId: schemaStore[schemaName] };

      const schemaPayload = generateSchemaPayload(umlClass);
      try {
        const response = await axiosInstance.post('/schemas', schemaPayload);
        const { schemaId, entitySchema } = response.data;

        schemaStore[entitySchema.name] = schemaId;
        return { name: entitySchema.name, schemaId };
      } catch (error) {
        if (error.response?.status === 409) {
          errors[schemaName] = 'Schema conflict.';
          return null;
        }
        errors[schemaName] = error.message;
        return null;
      }
    });

    const results = await Promise.all(promises);
    results.forEach(result => {
      if (result) successData[result.name] = result.schemaId;
    });

    if (Object.keys(errors).length > 0) {
      return res.status(207).json({ successData, errors });
    }
    res.status(200).json(successData);
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error.', error: error.message });
  }
};

exports.createSchemaPayload = async (req , res) => {
  const {universeID} = req.query;
  const attributeJson = req.body;
  const schemaPayload = createPayload(universeID ,attributeJson)
  res.status(200).json(schemaPayload)
}

exports.updateSchemaDefinitionAuto = async (req , res) => {
  const {schemaId} = req.query;
  const response = await updateSchemaDefAuto(schemaId)
  res.status(200).json({response})
}
