const axios = require("axios");
const metadATA = require("./data/figmaList.json");

const getFigmaNodeData = async (fileKey, nodeId, token) => {
  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}/nodes`, {
      params: { ids: nodeId },
      headers: {
        'X-Figma-Token': token
      }
    });

    console.log("Fetched data for", nodeId);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching Figma data:', error.response?.data || error.message);
    return null;
  }
};

const getData = async (children) => {
  const result = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const res = await getFigmaNodeData(
      "0Jq8LmC7SRzHSyclV4P0C6",
      child.id,
      process.env.FIGMA_TOKEN
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
        version: res.nodes[nodeId].schemaVersion
      },
      styles: res.nodes[nodeId].styles
    };
    result.push(payload);
  }

  return result;
};

const figmaPayload = async (id) => {
  try {
    const children = metadATA.nodes[id].document.children;
    const res = await getData(children);
    return res;
  } catch (error) {
    console.error('Failed to retrieve Figma payload:', error);
    return null;
  }
};

module.exports = { figmaPayload };
