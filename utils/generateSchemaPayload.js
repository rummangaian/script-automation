const generateSchemaPayload = (classObj) => ({
  entityName: classObj.className.toLowerCase(),
  description: classObj.className.toLowerCase(),
  schemaReadAccess: "PUBLIC",
  dataReadAccess: "PUBLIC",
  dataWriteAccess: "PUBLIC",
  metadataReadAccess: "PUBLIC",
  metadataWriteAccess: "PUBLIC",
  universes: ["67d177d1d95c257e73c4959e"],
  tags: { "BLUE": [] },
  attributes: classObj.attributes.map(attr => ({
    name: attr.name,
    nestedName: attr.name,
    type: { type: attr.type },
    required: attr.required,
    videos: [],
    childAttributes: []
  })),
  primaryKey: classObj.attributes
    .filter(attr => attr.required)
    .map(attr => attr.name),
  execute: "PUBLIC",
  visibility: "PUBLIC"
});

module.exports = generateSchemaPayload;
