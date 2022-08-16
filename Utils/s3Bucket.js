import dotenv from "dotenv";
import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";
import sharp from "sharp";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_KEY;

const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});
// Get a file to S3

export const downloadFile = async (bussinessId, folderName, fileName) => {
  try {
    // console.log(`${categoryName}/${bussinessId}/${fileName}`);
    const downloadParams = {
      Key: `${bussinessId}/${folderName}/${fileName}`,
      Bucket: bucketName,
    };
    return await s3.getObject(downloadParams).createReadStream();
  } catch (error) {
    return res.json({
      success: false,
      msg: "something went wrong",
      err: error,
    });
  }
};

export const uploadfile = async (file, bussinessId, folderName) => {
  try {
    // const picArray = [];
    // console.log(file);
    // console.log("git")
    if (folderName === "all") {
      const result = await sharp(file[0].path)
        .resize({ width: 800, height: 400, fit: "fill" })
        .webp({ quality: 20 })
        .toFile(file[0].originalname);
    } else {
      const result = await sharp(file[0].path)
        .webp({ quality: 20 })
        .toFile(file[0].originalname);
    }
    const fileStream = fs.createReadStream(file[0].originalname);
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: `${bussinessId}/${folderName}/${file[0].originalname}`,
    };
    const S3 = await s3.upload(uploadParams).promise();
    fs.unlinkSync(file[0].originalname);
    fs.unlinkSync(`uploads/${file[0].originalname}`);
    // console.log("s3 Working");
    return S3;
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "something went wrong on s3",
      err: error,
    });
  }
};

// for (var i = 0; i < files.length; i++) {
//   console.log("Loop No:", i);
//   console.log(files[i].fileName);
//   const result = await sharp(files[i].path)
//     .resize({ width: 1200, height: 1000, fit: "contain" })
//     .webp({ quality: 20 })
//     .toFile(files[i].fileName);
//   let fileStream = fs.createReadStream(files[i].fileName);
//   const uploadParams = {
//     Bucket: lowBucketName,
//     Body: fileStream,
//     Key: `/${bussinessId}/${files[i].fileName}`,
//   };
//   console.log(files[i].fileName);
//   const s = await s3.upload(uploadParams).promise();
//   console.log(s, "s");
//   picArray.push(s);
//   fs.unlinkSync(files[i].fileame);
//   fs.unlinkSync(`uploads/${files[i].fileName}`);
// }
// return picArray;
