module.exports = {
  name: {
    type: "keyword",
  },
  phone: {
    type: "long",
  },
  isPhoneVerified: {
    type: "boolean",
  },
  email: {
    type: "keyword",
  },
  isEmailVerified: {
    type: "boolean",
  },
  tokenSalt: {
    type: "keyword",
  },
  loginAttempts: {
    type: "byte",
  },
  blockExpires: {
    type: "date",
  },
  deviceId: {
    type: "keyword",
  },
  deviceType: {
    type: "keyword",
  },
  fcmToken: {
    type: "keyword",
  },
  verified: {
    type: "boolean",
  },
  status: {
    type: "boolean",
  },
  deletedAt: {
    type: "date",
  },
  deletedBy: {
    type: "long",
  },
  createdAt: {
    type: "date",
  },
  createdBy: {
    type: "long",
  },
  updatedAt: {
    type: "date",
  },
  updatedBy: {
    type: "long",
  },
};
