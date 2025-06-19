const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3NTAzNDg1ODQsImlhdCI6MTc1MDMxMjU4NCwianRpIjoiNjJiOTdiZTYtM2Q4Zi00YTk2LTkzYmMtNzJlN2YzOWI2Y2M3IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLXNlcnZpY2Uua2V5Y2xvYWsuc3ZjLmNsdXN0ZXIubG9jYWw6ODA4MC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIkJPTFRaTUFOTl9CT1RfbW9iaXVzIiwiYWNjb3VudCJdLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1lfbW9iaXVzIiwic2lkIjoiOTRhMTQyYWItZDZmZC00M2I5LTg3M2YtOWEyZDdkZjg1YTJlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiSE9MQUNSQUNZX21vYml1cyI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiQk9MVFpNQU5OX0JPVF9tb2JpdXMiOnsicm9sZXMiOlsiQk9MVFpNQU5OX0JPVF9VU0VSIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJrc2FteHAga3NhbXhwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJwbGF0Zm9ybUlkIjoibW9iaXVzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicGFzc3dvcmRfdGVuYW50X2tzYW14cEBtb2JpdXNkdGFhcy5haSIsImdpdmVuX25hbWUiOiJrc2FteHAiLCJmYW1pbHlfbmFtZSI6ImtzYW14cCIsImVtYWlsIjoicGFzc3dvcmRfdGVuYW50X2tzYW14cEBtb2JpdXNkdGFhcy5haSJ9.kDrm-MlVREy6lOV6C6kq7gYhY68qemf0nI3xKJVaBeCiqn3jUUqXV8LDHekB4CCqabV0hale0M2M-pOsdFP0lNBCWl4wg-Y2n5uD4zCGyRisO8MlG8HyO3LRxRz3jssE9mwBHQA90Cd_Z1Rks4ZPWVnJc20IDWDx0UsEWy3DNG2_b9XcFFlV61FprkAvd6CvwOw25cyhJVCz1Hq0Yn-sFoTqB97TT675UEn-X3NVBS7kNXE2CXUiYK0AinBUeVkqKYQxX9kHOHWMasHpi9POZwqB-HL6wTJigm9fvEOcuI7iiR7AiZhwd3WJ6bPRnSwq0iJ-NKBoJXID6nphvk4YjA"
const { default: axios } = require("axios");
const { renameToken } = require("../constant");
const { getEntities, pushInstanceToSchema } = require("../services/pi");

const sample = {
  name: "SCHEMA for saving the options of the dashlets in DbaaS Universe",
  description:
    "SCHEMA for saving the options of the dashlets in DbaaS Universe",
  schemaReadAccess: "PUBLIC",
  dataReadAccess: "PUBLIC",
  dataWriteAccess: "PUBLIC",
  metadataReadAccess: "PUBLIC",
  metadataWriteAccess: "PUBLIC",
  universes: [],
  tags: {
    BLUE: ["SCHEMA"],
  },
  primaryKey: ["id"],
  attributes: [],
  primaryDb: "TIDB",
  piFeatures: {
    COHORTS: {
      COHORTS: ["TIDB"],
    },
    CONTEXT: {
      CONTEXT: ["TIDB"],
    },
    BIGQUERY: {
      BIGQUERY: ["TIDB"],
    },
  },
  oltpFeature: {
    queryingFeature: {
      TIDB: [
        {
          active: true,
        },
      ],
    },
  },
  execute: "PUBLIC",
  visibility: "PUBLIC",
};

const generateAttributeListPayload = (obj) => {
  const attributeList = [];
  for (const key in obj) {
    const val = obj[key];
    const attribute = {
      name: key,
      nestedName: key,
      type: {
        type: typeof val === "object" ? "object" : val,
      },
      required: false,
      reference: false,
      videos: false,
    };
    if (val === "array") {
      attribute.type.itemType = "string";
    }
    if (typeof val === "object" && val !== null) {
      attribute.children = generateAttributeListPayload(val);
    }
    attributeList.push(attribute);
  }

  return attributeList;
};

const createPayload = (universeID, attributeJson) => {
  const attributeList = generateAttributeListPayload(attributeJson);
  let res = sample;
  res.universes = [universeID];
  res.attributes = attributeList;
  return res;
};

const deleteAttribute = async (schemaId) => {
  const url = `https://ig.gov-cloud.ai/pi-entity-service-dbaas/v1.0/schemas/${schemaId}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const body = {
    deleteAttributes: [
      {
        attributeToBeDeleted: "x_axis",
      },
      {
        attributeToBeDeleted: "y_axis",
      },
    ],
  };

  try {
    const response = await axios.put(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error("error", error);
    return {
      message: "failure to delete the attribute from schema ",
      error: error,
    };
  }
};

const addAttribute = async (schemaId) => {
  const url = `https://ig.gov-cloud.ai/pi-entity-service-dbaas/v1.0/schemas/${schemaId}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const body = {
    addAttributes: [
      {
        name: "y_axis",
        nestedName: "y_axis",
        type: {
          type: "array",
          itemType: "String",
        },
        required: false,
        reference: false,
        childAttributes: [],
        access: "PUBLIC",
      },
    ],
  };

  try {
    const response = await axios.put(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error("error", error);
    return {
      message: "failure to add the attribute from schema ",
      error: error,
    };
  }
};


const updateSchemaDefAuto = async (schemaId) => {
  // const instances = await getEntities(schemaId);
  const instances = [{
  "query" : "backend_adhoc",
  "Bq" : "SELECT DATE_FORMAT(ams.`last_maintenance_date`, '%Y-%m') AS month, AVG(DATEDIFF(ams.`next_due_date`, ams.`last_maintenance_date`)) AS MTBF FROM t_6707cb8fb4751123fdc5925e_t AS ams GROUP BY month ORDER BY month;",
  "x_axis" : [ "month" ],
  "type" : "line",
  "name" : "Mean Time Between Failures(MTBF)",
  "y_axis" : [ "MTBF" ]
},  {
  "query" : "backend_adhoc",
  "Bq" : "SELECT ap.`partner_name` AS `partner_name`, ap.`partnership_status` AS `status`, ap.`overall_performance_score` AS `performance_score`, SUM(fs.`total_flights`) AS `total_flights` FROM t_6707d28fb4751123fdc59270_t ap JOIN t_6707d28fb4751123fdc59272_t fs ON ap.`airline_partner_id` = fs.`airline_partner_id` GROUP BY ap.`partner_name`, ap.`partnership_status`, ap.`overall_performance_score`;",
  "x_axis" : [ "partner_name" ],
  "type" : "line",
  "name" : "Airline Partner Performance and Flight Summary",
  "y_axis" : [ "total_flights", "performance_score" ]
}]
  const deleteAttrRes = await deleteAttribute(schemaId);
  const addAttriRes = await addAttribute(schemaId);
  const instancePush = await pushInstanceToSchema(schemaId , instances , token)
  return {deleteAttrRes , addAttriRes , instancePush};
};

module.exports = { createPayload, updateSchemaDefAuto };
