const transformService = require("../services/transformService");

const transformBQ = async (req, res) => {
  try {
    const { schemaId } = req.query;

    const result = await transformService.transformBQService(schemaId);
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const refactorBq = async (req , res) => {
    const {bqId} = req.query;
    try {
        const result = await transformService.payloadFromConstructId(bqId);
        res.status(200).json({
            ...result
        })
    } catch (error) {
        
    }
}

const flattenCols = async(req , res) => {
    const {schemaIds} = req.body;
    try {
        const result = await transformService.flattenSchemaCols(schemaIds);
        res.status(200).json({
            result
        })
    } catch (error) {
        
    }
}

const refactorAdhoc = async(req , res) => {
    const {list} = req.body;
    try {
        const result = await transformService.refactorAdhocService(list);
        res.status(200).json({
            result
        })
    } catch (error) {
        
    }
}



module.exports = {transformBQ , refactorBq , flattenCols , refactorAdhoc};