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
}