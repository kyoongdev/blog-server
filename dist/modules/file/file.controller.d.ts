/// <reference types="multer" />
import { UploadedFileDTO } from './dto';
import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadImage(file: Express.Multer.File): Promise<UploadedFileDTO>;
}
