import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common' 

@Injectable()
export class FileTypeValidationPipe implements PipeTransform{
    transform(file: Express.Multer.File, metadata: ArgumentMetadata){

        console.log('PIPE FILE', { metadata });

        if (!file) {
            throw new BadRequestException('Asegurese de seleccionar una imagen')   
        }

        const fileExtension = file.mimetype.split('/')[1];
        const validTypes = ['jpg', 'png', 'jpeg'];

        if (!validTypes.includes(fileExtension)) {
            throw new BadRequestException(`Asegúrese que el archivo sea una imagen de tipo ${ validTypes }`);
        }

        return file;
        
    }
}