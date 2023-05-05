import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { InstitutionResolver } from './institution.resolver';
import { InstitutionService } from './institution.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Institution])
    ],
    exports: [
        TypeOrmModule,
        InstitutionService
    ],
    providers: [
        InstitutionResolver, 
        InstitutionService
    ]
})
export class InstitutionModule {}
