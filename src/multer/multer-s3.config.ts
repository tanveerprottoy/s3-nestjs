import * as path from "path";
import { v4 as uuidv4 } from 'uuid';
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.S3_REGION
});

export function getMulterS3Config(
    bucketName: string
) {
    return {
        storage: multerS3({
            s3: s3,
            bucket: bucketName,
            //shouldTransform: true,
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                // console.log('metadata ' + file);
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