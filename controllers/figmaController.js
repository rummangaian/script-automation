const figmaService = require("../services/figmaService");
require("dotenv").config();

const formPayload = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await figmaService.figmaPayload(id);
    res.status(200).json({ data: result });
  } catch (error) {
    console.error("Failed to fetch figma payload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const singleInstance = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await figmaService.singleInstancePayload(id);
    res.status(200).json({
      msg: "Success",
      data: result,
    });
  } catch (error) {
    console.error("error" , error);
    res.status(500).json({
      msg:"failure",
      error : "Internal server error"
    })
  }
};

const getFigmaData = async (req, res) => {
  try {
    const { id, fileKey } = req.query;
    const result = await figmaService.getFigmaNodeData(
      fileKey,
      id,
      process.env.FIGMA_PAT
    );
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
module.exports = { formPayload, getFigmaData , singleInstance};
