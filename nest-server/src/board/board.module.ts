import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { ElectoralProcessModule } from 'src/electoral-process/electoral-process.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
        ElectoralProcessModule
    ],
    exports: [
        TypeOrmModule,
        BoardService
    ],
    providers: [BoardService, BoardResolver]
})
export class BoardModule {}
