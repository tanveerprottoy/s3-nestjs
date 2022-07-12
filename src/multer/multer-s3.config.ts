import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import * as multerS3 from "multer-s3";
import { S3NodeClientInstance } from "../libs/s3";
import { AppUtils } from "../utils/app.utils";

export function getMulterS3Config() {
    AppUtils.dotenvConfig();
    S3NodeClientInstance.init();
    return {
        storage: multerS3({
            s3: S3NodeClientInstance.s3Client,
            bucket: process.env.S3_BUCKET_NAME,
            //shouldTransform: true,
            acl: "public-read",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                // console.log("metadata " + file);
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                const name = uuidv4() + path.extname(file.originalname);
                cb(null, name);
            },
        }),
        limits: { fileSize: 1024 * 1024 * 50 }
    }
}