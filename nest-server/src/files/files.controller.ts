import { Controller, Post, UploadedFile, UseInterceptors, UsePipes, Get, Res, Param, UseGuards, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypeValidationPipe, fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { ftypeExtension } from './helpers/fileValidator';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('institution/:imageName')
  getInstitutionImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {    
    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path);
  }

  @UseGuards(JwtAuthGuard)
  @Post('institution')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/institution',
      filename: fileNamer
    })
  }))
  // @UsePipes(new FileTypeValidationPipe())
  uploadInstitutionImage(
    @UploadedFile(
      
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({fileType: 'image/png'})
        ]
      })
    ) image: Express.Multer.File,
    @CurrentUser([ValidRoles.elector]) user: User,
  ){
    // console.log({ user });
    // TODO: Replace validation pipe 
    const url = `${ this.configService.get('HOST_API') }/files/institution/${ image.filename }`;

    return { url }

  }
}
