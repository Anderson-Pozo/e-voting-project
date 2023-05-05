import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectoralProcess } from './entities/electoral-process.entity';
import { ElectoralProcessResolver } from './electoral-process.resolver';
import { ElectoralProcessService } from './electoral-process.service';
import { InstitutionModule } from 'src/institution/institution.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ElectoralProcess]),
        InstitutionModule,
    ],
    exports: [
        TypeOrmModule,
        ElectoralProcessService
    ],
    providers: [ElectoralProcessResolver, ElectoralProcessService]
})
export class ElectoralProcessModule {}
