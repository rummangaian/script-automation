const figmaService = require("../services/figmaService");

exports.formPayload = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await figmaService.figmaPayload(id);
    // if (!result) {
    //   return res.status(404).json({ message: "No payload found for the given ID" });
    // }
    res.status(200).json({ data: result });
  } catch (error) {
    console.error("Failed to fetch figma payload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
