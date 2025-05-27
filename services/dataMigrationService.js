const { default: axios } = require("axios");
const { ddqToken } = require("../constant.js");

const dataMigrate = async (dataArray) => {
  let success = [];

  for (let i = 0; i < dataArray.length; i++) {
    const element = dataArray[i];
    try {
      const url = `https://ig.gov-cloud.ai/pi-entity-instances-service/migrate/schema`;
      const body = {
        schemIds: [element],
        fromCollectionName: "private_entity_schema",
        pidBaaSConstructs: "SCHEMA",
        toCollectionName: "entity_schema",
      };

      const res = await axios.post(url, body, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKZTNYVjhSWHI0SzFWZmRWTjJ2ejFVMTZPWGRZaUFENWdEaDREc1RuNlRnIn0.eyJleHAiOjE3MjI0NTk5MDMsImlhdCI6MTcyMjQyMzkwMywianRpIjoiODJiZGE3ZDktNDJhYi00NGIxLTliNmMtMTkxMzk4ZmRmNzRlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOlsidGVzdEN1c3RvbTEiLCJ0ZXN0Q3VzdG9tMiIsImFjY291bnQiXSwic3ViIjoiODliZWRhNzQtODU5Mi00NWZlLThmZGQtMWZkOWEzNWRjYTgzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiSE9MQUNSQUNZIiwic2Vzc2lvbl9zdGF0ZSI6IjBkNzdmN2IzLTgxZDMtNDQzMi05NmZmLWE3YTg4NWRmZWExNCIsIm5hbWUiOiJkamRrIHRlc3QxIiwiZ2l2ZW5fbmFtZSI6ImRqZGsiLCJmYW1pbHlfbmFtZSI6InRlc3QxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicGFzc3dvcmRfdGVuYW50X2NmY2ZAZ2F0ZXN0YXV0b21hdGlvbi5jb20iLCJlbWFpbCI6InBhc3N3b3JkX3RlbmFudF9jZmNmQGdhdGVzdGF1dG9tYXRpb24uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InRlc3RDdXN0b20xIjp7InJvbGVzIjpbInRlc3QyIiwidGVzdDMiLCJ0ZXN0MSJdfSwidGVzdEN1c3RvbTIiOnsicm9sZXMiOlsidGVzdDIiLCJ0ZXN0MyIsInRlc3QxIl19LCJIT0xBQ1JBQ1kiOnsicm9sZXMiOlsiSE9MQUNSQUNZX1VTRVIiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjBkNzdmN2IzLTgxZDMtNDQzMi05NmZmLWE3YTg4NWRmZWExNCIsInRlbmFudElkIjoiODliZWRhNzQtODU5Mi00NWZlLThmZGQtMWZkOWEzNWRjYTgzIiwicmVxdWVzdGVyVHlwZSI6IlRFTkFOVCJ9.g3gS5jWPo1iqn1Ytkk3ETiuN1D5RgqByBOd8u55EzxhmvuhoVIrJdUWZOBOaplB-5hzAk4dPQNRkDkgYFVaLCMRUihK9Y-tGgdBbPVZwaXkidaEHaoM81djNfVhY3J5KlOBNn2lH4Deh3lHVYvF7aO-KmL0ECBuaaltO9gqDc5xSzwy7U58sT-ONxL_yP-AUkB5CN2g6HMhxt2-cPFodbjSnNyeO00Ri7GastHfr8ZK-3zW25oDwshk87osAvWsfI6qcR3RwFRdXX_cwBEU0x9CRVVOsngGr4VbM3uFXpROM12tYHqrPIptEgKB4VVlGd-GUF-vSC7Sw5v1lEcOwdg",
          "Content-Type": "application/json",
        },
      });
      if (res.data.msg === " Request has been Successfully Submitted")
        success.push(element);
      console.log("schema migrated ", element);
    } catch (err) {
      console.error("err.data", err.data);
    }
  }
};

const checkStatusMigration = async (data) => {
  let fail = [];
  let success = [];
  for (let i = 0; i < data.length; i++) {
    const schemaId = data[i];
    try {
      const res = await axios.get(
        `https://ig.gov-cloud.ai/pi-entity-service-dbaas/v1.0/schemas/${schemaId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ddqToken}`,
          },
        }
      );
      if (res.status === 404) {
        console.log(res.data);
        fail.push(res.data);
      } else {
        success.push(schemaId);
      }
    } catch (error) {
      console.error(error.response.data.subErrors[0].message);
      fail.push(schemaId);
    }
  }
  return {
    fail: fail,
    success: success,
  };
};

module.exports = { checkStatusMigration, dataMigrate };
