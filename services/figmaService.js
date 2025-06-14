const axios = require("axios");
// const metadATA = require("./data/figmaList.json");
const { figmaPAT } = require("../constant");
const {pushInstanceToSchema} = require("../services/pi.js")

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

const getData = async (metaData) => {
  const result = [];

  // for (let z = 0; z < metaData.length; z++) {
  //   const data = metaData[z].children;
    for (let y = 0; y < metaData.length; y++) {
    const children = metaData[y].children;
    for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const res = await getFigmaNodeData(
      "0Jq8LmC7SRzHSyclV4P0C6",
      child.id,figmaPAT
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

    const response = await pushInstanceToSchema("682ffe9bf42f855ab22b3182" , payload)
    console.log(response.msg , " for copo id ", nodeId)
    result.push(nodeId);
  }
  }
  // }

  

  
  console.log(result.length , " figma compoenent have been fetched successfully ")
  return result;
};

const getFigmaFile = async(compId)=> {
  try {
    const url = `https://api.figma.com/v1/files/0Jq8LmC7SRzHSyclV4P0C6/nodes?ids=${compId}`
    const headers = {"X-Figma-Token":figmaPAT}
    const res = await axios.get(url,{
      headers
    })
    return res.data
  } catch (error) {
    console.log("error" , error)
  }
}

const figmaPayload = async (id) => {
  try {
    const metadATA = await getFigmaFile(id);
    // return metadATA.nodes[id].document.children
    const children = metadATA.nodes[id.replace(/-/g, ':')].document.children;
    // return children
    const res = await getData(children);
    return res;
  } catch (error) {
    console.error('Failed to retrieve Figma payload:', error);
    return null;1439-20997
  }
};

module.exports = { figmaPayload };
