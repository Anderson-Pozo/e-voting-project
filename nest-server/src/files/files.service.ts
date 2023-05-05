import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
    getStaticProductImage(imageName: string){
        const path = join(__dirname, '../../static/institution', imageName);

        if (!existsSync(path)) {
            throw new NotFoundException(`Not found product with name ${ imageName }`);
        }

        return path;
    }
}
