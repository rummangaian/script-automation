const { default: axios } = require("axios");
const { ddqToken, constructToken, renameToken } = require("../constant");

const listEntityInstances = async (
  schemaId,
  filter = {},
  dbType = "TIDB",
  page = 0,
  size = 100
) => {
  const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?page=${page}&size=${size}`;

  const headers = {
    accept: "application/json, text/plain, */*",
    "content-type": "application/json",
    authorization: `Bearer ${ddqToken}`,
  };

  const body = {
    dbType,
    filter,
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching entity instances:",
      error.response?.data || error.message
    );
    throw error;
  }
};

async function fetchBigQueryMetadata(instancesList) {
  const result = [];
  const url =
    "https://ig.gov-cloud.ai/pi-bigquery-service-dbaas/v1.0/big-queries/metadata?size=2&page=0";

  const headers = {
    Authorization: `Bearer ${constructToken}`,
    "Content-Type": "application/json",
  };

  for (let i = 0; i < instancesList.length; i++) {
    i;

    const body = {
      constructId: instancesList[i].Bq,
    };
    try {
      const response = await axios.post(url, body, { headers });
      result.push(response.data);
    } catch (error) {
      console.error(
        "Error fetching metadata:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
  return result;
}

async function fetchBigQueryMetadataUnique(bqId) {
  const url =
    "https://ig.gov-cloud.ai/pi-bigquery-service-dbaas/v1.0/big-queries/metadata?size=2&page=0";

  const headers = {
    Authorization: `Bearer ${constructToken}`,
    "Content-Type": "application/json",
  };

  const body = {
    constructId: bqId,
  };
  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching metadata:",
      error.response?.data || error.message
    );
    throw error;
  }
}

function buildPayloadFromMetadata(metadata) {
  if (!metadata.content || metadata.content.length === 0) {
    throw new Error("No content found in metadata.");
  }

  const item = metadata.content[0]; // Assuming single item payload creation for now
  const definition = item.definition;

  // Construct resultantDataType from metadata.columns
  const resultantDataType = {};
  if (item.metadata && item.metadata.columns) {
    item.metadata.columns.forEach((col) => {
      resultantDataType[col.name] = {
        type: col.type,
      };
    });
  }

  const payload = {
    universes: definition.universes || [],
    name: item.name,
    description: item.desc,
    schemaIds: definition.aqDefinitionRequest.tables || [],
    bqRawQueryDefinition: {
      sourceDb: item.type,
      rawQuery: definition.definition,
      destinationDb: [item.type],
    },
    queryType: definition.type,
    dataStoreType: definition.dataStoreType,
    additionalMetadata: definition.additionalMetadata || {},
    visibility: item.visibility,
    dataReadAccess: definition.dataReadAccess,
    dataWriteAccess: definition.dataWriteAccess,
    metadataReadAccess: definition.metadataReadAccess,
    metadataWriteAccess: definition.metadataWriteAccess,
    execute: definition.execute,
    isUsedForGroups: definition.isUsedForGroups,
    placeHolders: definition.placeHolders,
    tags: definition.tags,
    resultantDataType: resultantDataType,
  };

  return payload;
}

const createBqHelper = async (payload) => {
  const url =
    "https://ig.gov-cloud.ai/pi-bigquery-service-dbaas/v1.0/big-queries";

  const headers = {
    Authorization: `Bearer ${constructToken}`,
    "Content-Type": "application/json",
  };

  const body = payload;
  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching metadata:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const schemaListUniverseList = (list) => {
  const result = {
    schemaId: [],
    universes: [],
  };

  list.forEach((element) => {
    console.log(
      "andi",
      element.content[0].definition.aqDefinitionRequest.tables
    );
    result.schemaId.push(
      ...element.content[0].definition.aqDefinitionRequest.tables
    );
    result.universes.push(...element.content[0].definition.universes);
  });

  return result;
};

const transformBQService = async (schemaId) => {
  try {
    //get the list of instances of bq
    const instancesList = await listEntityInstances(schemaId);
    //we get the metaData content of the each bq
    const bqRes = await fetchBigQueryMetadata(instancesList);
    const schemaUniverse = schemaListUniverseList(bqRes);
    return schemaUniverse;
    return bqRes;
  } catch (error) {
    return error;
  }
};

const payloadFromConstructId = async (bqId) => {
  try {
    const content = await fetchBigQueryMetadataUnique(bqId);
    const payload = buildPayloadFromMetadata(content);
    // const bq = await createBqHelper(payload)
    return payload;
  } catch (error) {
    return error;
  }
};

const flattenAPIexecute = async (body) => {
  const url = "https://ig.gov-cloud.ai/dbaas/v1.0/schemas/column/rename";

  const headers = {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MzMxNzE1MzQsImlhdCI6MTczMzEzNTUzNCwianRpIjoiOTk4ZDk0NDktNTM2OS00OTdhLTg4YzAtN2FmNjYzZDM2MDM3IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJQQVNDQUxfSU5URUxMSUdFTkNFIiwiWFBYLUNNUyIsImNkZmciLCJhY2NvdW50Il0sInN1YiI6IjdjMmEwY2M1LTY5ODgtNDk5OS04ZjZkLTQ4MjM2MzQ4MmVlZiIsInR5cCI6IkJlYXJlciIsImF6cCI6IkhPTEFDUkFDWSIsInNlc3Npb25fc3RhdGUiOiIzZjRkYjdlMC0zM2IxLTRhYjQtYjgwYi0zODhhNGUyYjNlNDgiLCJuYW1lIjoibW9iaXVzIG1vYml1cyIsImdpdmVuX25hbWUiOiJtb2JpdXMiLCJmYW1pbHlfbmFtZSI6Im1vYml1cyIsInByZWZlcnJlZF91c2VybmFtZSI6InBhc3N3b3JkX3RlbmFudF9tb2JpdXNAbW9iaXVzZHRhYXMuYWkiLCJlbWFpbCI6InBhc3N3b3JkX3RlbmFudF9tb2JpdXNAbW9iaXVzZHRhYXMuYWkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiUEFTQ0FMX0lOVEVMTElHRU5DRSI6eyJyb2xlcyI6WyJTVVBFUkFETUlOIl19LCJYUFgtQ01TIjp7InJvbGVzIjpbIlhQWC1DTVNfVVNFUiJdfSwiSE9MQUNSQUNZIjp7InJvbGVzIjpbIkhPTEFDUkFDWV9VU0VSIl19LCJjZGZnIjp7InJvbGVzIjpbIkJPTFRaTUFOTl9CT1RfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiM2Y0ZGI3ZTAtMzNiMS00YWI0LWI4MGItMzg4YTRlMmIzZTQ4IiwidGVuYW50SWQiOiI3YzJhMGNjNS02OTg4LTQ5OTktOGY2ZC00ODIzNjM0ODJlZWYiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.NEhACUI5FtTEcbbeZedP8kyGBX4CO0OSZ72pNyX49MQjKGHAwpiiuIa2TpRsi7HY6x-DwfDpiCjWCjVT3GVlYwId6FCwUh8nz8gUQx-6gRp9Y5GlR2YWUrYDea-ltvxKXtExIVcP-DmLN-vfiONPC-PuXq9iG-g9-Rbn0jAgm85lOHSrmHjHJjN7kMsUuP21OdHx-7If0w6Hp7U28raHudhzq0CN_lSMdj3ydgjI81f5WtShJVbbmOK-JJp3Qf870pN4ppsZPkwQagCmWjArCkfagrPox3sbjoOTzfnPqhefKUbuCtU7mtrQ8_4Dm5wcf0DrFvJ94c7M6YQsUL6RyA`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching metadata:",
      error.response?.data || error.message
    );
    throw error;
  }

};

const flattenPayload =async (schemaId, instance) => {
  const res = [];
  for (const [key, value] of Object.entries(instance)) {
    const obj = {
      tableName: schemaId,
      oldColumnName: `entity.${key}`,
      newColumnName: key,
    };
    res.push(obj);
    console.log(obj)
    const response = await flattenAPIexecute(obj)
    console.log(response)
    res.push(response)
  }
  return res;
};

const flattenSchemaCols = async (schemaIds) => {
  const result = [];
  for (let i = 0; i < schemaIds.length; i++) {
    const res = await listEntityInstances(schemaIds[i]);
    const instance = res[0];
    if (instance.entity !== undefined) {
      const res = flattenPayload(schemaIds[i], instance.entity);
      result.push(instance);
    }
  }
  return result;
};

module.exports = {
  transformBQService,
  payloadFromConstructId,
  flattenSchemaCols,
};
