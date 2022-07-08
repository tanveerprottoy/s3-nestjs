import { Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AppService } from './app.service';
import { getMulterS3Config } from "./multer/multer-s3.config";

@Controller()
export class AppController {

    constructor(private readonly appService: AppService) { }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: "files", maxCount: 1 }
            ],
            getMulterS3Config(
                "bucket"
            )
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
