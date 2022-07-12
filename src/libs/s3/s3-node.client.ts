import { S3Client } from "@aws-sdk/client-s3";

class S3NodeClient {
    private static instance: S3NodeClient;
    s3Client: S3Client

    private constructor() {
        console.log("S3NodeClient init");
        if(S3NodeClient.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): S3NodeClient {
        S3NodeClient.instance = S3NodeClient.instance || new S3NodeClient();
        return S3NodeClient.instance;
    }

    init() {
        if(this.s3Client) {
            return;
        }
        this.s3Client = new S3Client({
            region: process.env.S3_REGION,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            }
        });
    }
}

export const S3NodeClientInstance = S3NodeClient.getInstance();