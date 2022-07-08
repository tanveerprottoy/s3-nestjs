import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    
    upload(
        files: {
            files?: Express.Multer.File[]
        },
    ) {
        console.log("upload files", files);
        return files;
    }
}
