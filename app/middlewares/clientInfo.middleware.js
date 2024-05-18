const userDevice = require("../services/userDevice.service");
const userDeviceService = userDevice.getInstance("UserDevice"); //new userDevice("UserDevice");

exports.deviceInfo = (req, res, next) => {
  const deviceInfo = {};
  let token = null;
  deviceInfo["ip"] = req.ip;

  if (req.headers["authorization"]) {
    let bearerHeader = req.headers["authorization"];
    token = bearerHeader.split(" ")[1];
  }
  deviceInfo["accessToken"] = token;

  if (req.headers["x-forwarded-for"]) {
    deviceInfo["ip"] = req.headers["x-forwarded-for"].split(",")[0].trim();
  }

  if (req.headers["device-mac"]) {
    deviceInfo["mac"] = req.headers["device-mac"];
  }

  if (req.headers["device-id"]) {
    deviceInfo["deviceId"] = req.headers["device-id"];
  }

  if (req.headers["device-type"]) {
    deviceInfo["deviceType"] = req.headers["device-type"];
  }

  if (req.headers["device-fcm-token"]) {
    deviceInfo["fcmToken"] = req.headers["device-fcm-token"];
  }

  if (req.headers["device-os"]) {
    deviceInfo["os"] = req.headers["device-os"];
  }

  if (req.headers["device-browser"]) {
    deviceInfo["browser"] = req.headers["device-browser"];
  }

  if (token) userDeviceService.updateInfo(deviceInfo);

  req.deviceInfo = deviceInfo; // Store it in the request object for easy access
  next(); // Move to the next middleware or route handler
};
