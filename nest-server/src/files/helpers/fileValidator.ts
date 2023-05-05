
abstract class FileValidator<TValidationOptions = Record<string, any>> {
    constructor(protected validationOptions: TValidationOptions) {}
    abstract isValid(file?: any): boolean | Promise<boolean>;
    abstract buildErrorMessage(file: any): string;
}

type FileTypeValidatorOptions = {
    fileType: string | any;
};

export class TypeValidator extends FileValidator<FileTypeValidatorOptions> {
    constructor(validationOptions: FileTypeValidatorOptions){
        super({ fileType: validationOptions.fileType });
    }
    
    buildErrorMessage(): string{
        return 'Error de archivo'
    }
    
    isValid(file: Express.Multer.File): boolean {
        console.log({ file });
        return false
    }
}

export class ftypeExtension<FileTypeValidatorOptions> {
    option: FileTypeValidatorOptions;

    constructor(opt: FileTypeValidatorOptions ){
        this.option = opt
    }

    buildErrorMessage(): string{
        return 'Error de archivo'
    }
    
    isValid(file: Express.Multer.File): boolean {
        console.log({ file });
        return false
    }
}