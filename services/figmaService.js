const axios = require("axios");
const { pushInstanceToSchema } = require("../services/pi.js");

const getFigmaNodeData = async (fileKey, nodeId, token) => {
  console.log(fileKey, nodeId, token);
  try {
    const response = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}/nodes`,
      {
        params: { ids: nodeId },
        headers: {
          "X-Figma-Token": token,
        },
      }
    );

    console.log("Fetched data for", nodeId);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Figma data:",
      error.response?.data || error.message
    );
    return null;
  }
};

const getData = async (metaData) => {
  const result = [];

  for (let y = 0; y < metaData.length; y++) {
    const children = metaData[y].children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const res = await getFigmaNodeData(
        process.env.FIGMA_FILE_KEY,
        child.id,
        process.env.FIGMA_PAT
      );
      if (!res) continue;

      const nodeId = Object.keys(res.nodes)[0];
      const payload = {
        id: nodeId,
        name: res.nodes[nodeId].document.name,
        lastModified: res.lastModified,
        thumbnailUrl: res.thumbnailUrl,
        role: res.role,
        editorType: res.editorType,
        linkAccess: res.linkAccess,
        document: res.nodes[nodeId].document,
        components: res.nodes[nodeId].components,
        componentSets: res.nodes[nodeId].componentSets,
        schemaVersion: {
          version: res.nodes[nodeId].schemaVersion,
        },
        styles: res.nodes[nodeId].styles,
      };

      const response = await pushInstanceToSchema(
        process.env.FIGMA_SCHEMA_ID,
        payload
      );
      console.log(response.msg, " instance pushed for ", nodeId);
      result.push(nodeId);
    }
  }

  return result;
};

const getFigmaFile = async (compId) => {
  try {
    const url = `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}/nodes?ids=${compId}`;
    const headers = { "X-Figma-Token": process.env.FIGMA_PAT };
    const res = await axios.get(url, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

const figmaPayload = async (id) => {
  try {
    const metadATA = await getFigmaFile(id);
    const children = metadATA.nodes[id.replace(/-/g, ":")].document.children;
    const res = await getData(children);
    return res;
  } catch (error) {
    console.error("Failed to retrieve Figma payload:", error);
    return null;
  }
};

const getSingleData = async (id) => {
  const result = [];

  const res = await getFigmaNodeData(
    process.env.FIGMA_FILE_KEY,
    id,
    process.env.FIGMA_PAT
  );
  if (!res) return;

  const nodeId = Object.keys(res.nodes)[0];
  const payload = {
    id: nodeId,
    name: res.nodes[nodeId].document.name,
    lastModified: res.lastModified,
    thumbnailUrl: res.thumbnailUrl,
    role: res.role,
    editorType: res.editorType,
    linkAccess: res.linkAccess,
    document: res.nodes[nodeId].document,
    components: res.nodes[nodeId].components,
    componentSets: res.nodes[nodeId].componentSets,
    schemaVersion: {
      version: res.nodes[nodeId].schemaVersion,
    },
    styles: res.nodes[nodeId].styles,
  };

  const response = await pushInstanceToSchema(
    process.env.FIGMA_SCHEMA_ID,
    payload
  );
  console.log(response.msg, " instance pushed for ", nodeId);
  result.push(nodeId);

  return result;
};

const singleInstancePayload = async (id) => {
  try {
    const result = await getSingleData(id);
    return result;
  } catch (error) {
    console.error("Failed to retrieve Figma payload:", error);
    return null;
  }
};

module.exports = { figmaPayload, getFigmaNodeData, singleInstancePayload };
