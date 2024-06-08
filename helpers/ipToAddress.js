const request = require("request");
const url = "http://ip-api.com/json/";
const { baseError } = require("../system/core/error/baseError");

exports.ipToAddress = async (ip, type = "IPv4") => {
  try {
    const jsonDataUrl = `${url}${ip}`;
    request({
      url: jsonDataUrl,
      method: "GET",
      headers: {
        Accept: "text/json",
      },
      function(err, response, body) {
        if (err) throw new baseError(err);
        console.log(body);
        console.log(response);
      },
    });
  } catch (err) {
    throw new baseError(err);
  }
};
