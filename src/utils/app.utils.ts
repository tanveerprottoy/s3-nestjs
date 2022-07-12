import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";

export class AppUtils {

    static getConfigValue<T>(
        configService: ConfigService,
        key: string
    ) {
        return configService.get<T>(key);
    }

    static dotenvConfig() {
        dotenv.config();
    }

    static provideS3Vars(): string[] {
        return [
            process.env.S3_REGION,
            process.env.S3_ACCESS_KEY_ID,
            process.env.S3_SECRET_ACCESS_KEY,
            process.env.S3_BUCKET_NAME,
        ];
    }
}