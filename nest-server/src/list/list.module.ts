import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListService } from './list.service';
import { ListResolver } from './list.resolver';
import { ElectoralProcessModule } from 'src/electoral-process/electoral-process.module';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([List]),
        ElectoralProcessModule,
        CommonModule
    ],
    exports: [
        TypeOrmModule,
        ListService
    ],
    providers: [ListService, ListResolver]
})
export class ListModule {}
