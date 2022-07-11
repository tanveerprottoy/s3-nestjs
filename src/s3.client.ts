import { S3Client } from "@aws-sdk/client-s3";

class S3NodeJsClient {
    private static instance: S3NodeJsClient;
    private s3Client: S3Client

    private constructor() {
        console.log("S3NodeJsClient init");
        if(S3NodeJsClient.instance) {
            throw new Error("Error - already initialized");
        }
        this.s3Client = new S3Client({
            region: process.env.S3_REGION
        });
    }

    static getInstance(): S3NodeJsClient {
        S3NodeJsClient.instance = S3NodeJsClient.instance || new S3NodeJsClient();
        return S3NodeJsClient.instance;
    }
}

export const S3NodeJsClientInstance = S3NodeJsClient.getInstance();