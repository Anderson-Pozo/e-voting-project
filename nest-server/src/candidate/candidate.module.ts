import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { CandidateResolver } from './candidate.resolver';
import { CandidateService } from './candidate.service';
import { CommonModule } from 'src/common/common.module';
import { ListModule } from 'src/list/list.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Candidate]),
        CommonModule,
        ListModule
    ],
    exports: [
        TypeOrmModule
    ],
    providers: [CandidateResolver, CandidateService]
})
export class CandidateModule {}
