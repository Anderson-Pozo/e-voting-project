import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolver';
import { ListModule } from 'src/list/list.module';
import { AuthModule } from 'src/auth/auth.module';
import { ElectorModule } from 'src/elector/elector.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote]),
        ListModule,
        AuthModule,
        ElectorModule,
        UserModule
    ],
    exports: [
        TypeOrmModule
    ],
    providers: [VoteService, VoteResolver]
})
export class VoteModule {}
