const sample = {
  "name": "SCHEMA for saving the options of the dashlets in DbaaS Universe",
  "description": "SCHEMA for saving the options of the dashlets in DbaaS Universe",
  "schemaReadAccess": "PUBLIC",
  "dataReadAccess": "PUBLIC",
  "dataWriteAccess": "PUBLIC",
  "metadataReadAccess": "PUBLIC",
  "metadataWriteAccess": "PUBLIC",
  "universes": [],
  "tags": {
    "BLUE": [
      "SCHEMA"
    ]
  },
  "primaryKey": [
    "id"
  ],
  "attributes": [],
  "primaryDb": "TIDB",
  "piFeatures": {
    "COHORTS": {
      "COHORTS": [
        "TIDB"
      ]
    },
    "CONTEXT": {
      "CONTEXT": [
        "TIDB"
      ]
    },
    "BIGQUERY": {
      "BIGQUERY": [
        "TIDB"
      ]
    }
  },
  "oltpFeature": {
    "queryingFeature": {
      "TIDB": [
        {
          "active": true
        }
      ]
    }
  },
  "execute": "PUBLIC",
  "visibility": "PUBLIC"
}

const generateAttributeListPayload = (obj) => {
    const attributeList = [];
    for(const key in obj){
        const val = obj[key];
        const attribute = {
            name : key,
            nestedName:key,
            type : {
                type : typeof val === 'object' ? 'object' : val
            },
            required : false,
            reference : false,
            videos:false
        }
        if(val === "array"){
            attribute.type.itemType = "string" 
        }
        if(typeof val === 'object' && val !== null ){
            attribute.children = generateAttributeListPayload(val);
        }
        attributeList.push(attribute);
    }

    return attributeList;
}

const createPayload = (universeID , attributeJson) => {
    const attributeList = generateAttributeListPayload(attributeJson);
    let res = sample;
    res.universes = [universeID];
    res.attributes = attributeList;
    return res
}

module.exports = createPayload