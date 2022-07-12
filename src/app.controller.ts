import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AppService } from './app.service';
import { Constants } from "./utils/constants";
import { getMulterS3Config } from "./multer/multer-s3.config";
import { ConfigService } from "@nestjs/config";

@Controller({
    path: "",
    version: Constants.API_VERSION_1
})
export class AppController {

    constructor(
        private readonly appService: AppService
    ) { }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: "files", maxCount: 1 }
            ],
            getMulterS3Config()
        )
    )
    async upload(
        @UploadedFiles() files: {
            files?: Express.Multer.File[]
        },
    ) {
        return this.appService.upload(
            files
        );
    }
}
