const schema = require("../mapping/user.mapping");

module.exports = {
  index: "user",
  type: "user",
  include_type_name: true,
  body: {
    properties: schema,
  },
};
