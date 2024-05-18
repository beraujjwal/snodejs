const resourceSchema = {
  name: {
    type: "keyword",
  },
  slug: {
    type: "keyword",
  },
  status: {
    type: "boolean",
  },
  resourceMenus: {
    type: "nested",
    properties: {
      id: {
        type: "keyword",
      },
      parentID: {
        type: "keyword",
      },
      name: {
        type: "keyword",
      },
      slug: {
        type: "keyword",
      },
      status: {
        type: "boolean",
      },
    },
  },
  createdByUser: {
    type: "object",
    properties: {
      id: {
        type: "keyword",
      },
      name: {
        type: "keyword",
        ignore_above: 256,
      },
      phone: {
        type: "keyword",
      },
      email: {
        type: "keyword",
      },
      status: {
        type: "boolean",
      },
    },
  },
  updatedByUser: {
    type: "object",
    properties: {
      id: {
        type: "keyword",
      },
      name: {
        type: "keyword",
        ignore_above: 256,
      },
      phone: {
        type: "keyword",
      },
      email: {
        type: "keyword",
      },
      status: {
        type: "boolean",
      },
    },
  },
};
