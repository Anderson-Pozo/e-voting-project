import { Injectable, Logger, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CommonService {

    
    handleErrors(error: any, module?: string): never {

        let logger = new Logger(module);

        logger.error(error)
        
        switch (error.code) {
            case 'http-404':
                throw new NotFoundException(error.detail);
            case '23505' || '22001':
                throw new BadRequestException('Error de base de datos');
            default:
                throw new InternalServerErrorException('Check server logs')
                // throw new BadRequestException(error.detail);
        }

    }
}
