const axios = require("axios")
const { token } = require("../constant");

const prodUrl = "https://ig.gov-cloud.ai";
const accessToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ	";

const backend_access = "";

const getSchemaDetails = async (schemaId = "", token = accessToken) => {
  try {
    const res = await axios.get(
      `${prodUrl}/pi-entity-service-dbaas/v1.0/schemas/${schemaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return false;
  }
};

const getEntities = async (
  schemaId = "",
  filter = {},
  token = accessToken
) => {
  if (!schemaId) return;
  try {
    const body = {
      dbType: "TIDB",
      filter: filter,
    };
    const res = await axios.post(
      `${prodUrl}/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances/list?page=0&size=100`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res.data" , res.data)
    return res.data;
  } catch (e) {
    return false;
  }
};

 async function getBQData(bqId = "") {
  try {
    var res = await axios.get(
      `${prodUrl}/pi-get-data-quarkus/v1.0/bigQuery/${bqId}/data`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data?.model?.entities;
  } catch (e) {
    return false;
  }
}

 async function getBQDefinition(bqId = "", token = accessToken) {
  try {
    var res = await axios.get(
      `${prodUrl}/pi-bigquery-service/v1.0/big-queries/${bqId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return false;
  }
}

 async function getAdhocVAlue(querry) {
  try {
    var res = await axios.post(
      "https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc",
      { definition: querry, type: "TIDB" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return false;
  }
}

 async function createDataverse(
  uniNAme = "",
  desc = "",
  token = accessToken
) {
  try {
    var res = await axios.post(
      "https://ig.gov-cloud.ai/pi-dataverse-service/v1.0/dataverses",
      {
        name: uniNAme,
        description: desc,
        icon: "iconURL",
        tags: {
          RED: ["Universe"],
        },
        universeReadAccess: "PUBLIC",
        universeWriteAccess: "PUBLIC",
        visibility: "PUBLIC",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return false;
  }
}

async function pushInstanceToSchema(schemaId, payload , token = token) {
  const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/${schemaId}/instances`;

  try {
    const response = await axios.post(
      url,
      { data: payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    console.log(`Instance pushed successfully to schema: ${schemaId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to push instance to schema ${schemaId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = {pushInstanceToSchema , getSchemaDetails , getAdhocVAlue , getBQData , getAdhocVAlue , getEntities , createDataverse}