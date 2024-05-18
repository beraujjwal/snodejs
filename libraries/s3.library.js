"use strict";
require("dotenv").config();
const fs = require("fs");
const {
  CreateBucketCommand,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const { baseError } = require("../system/core/error/baseError");
const { s3Client } = require("../helpers/s3");

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const bucketRegion = process.env.AWS_S3_REGION;

exports.uploadBase64 = async ({
  imageBinary,
  name,
  type = "image/jpeg",
  bucket = bucketName,
  encoding = "base64",
  acl = "public-read",
}) => {
  try {
    const buf = Buffer.from(
      imageBinary.replace(/^data:image\/\w+;base64,/, ""),
      encoding
    );
    const data = {
      Bucket: bucket,
      Key: name,
      Body: buf,
      ACL: acl,
      ContentEncoding: encoding,
      ContentType: type,
    };

    return await s3Client.putObject(data, function (err, data) {
      if (err) if (err) throw new baseError(err);
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.download = async ({ path, bucket = bucketName }) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: path,
    });

    const response = await client.send(command);
    return await response.Body.transformToString();
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};
