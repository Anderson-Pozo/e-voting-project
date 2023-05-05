import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mjrv } from './entities/mjrv.entity';
import { MjrvService } from './mjrv.service';
import { MjrvResolver } from './mjrv.resolver';
import { BoardModule } from 'src/board/board.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Mjrv]),
        BoardModule,
        UserModule
    ],
    exports: [
        TypeOrmModule
    ],
    providers: [MjrvService, MjrvResolver]
})
export class MjrvModule {}
