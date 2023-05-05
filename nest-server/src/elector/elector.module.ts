import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Elector } from './entities/elector.entity';
import { ElectorResolver } from './elector.resolver';
import { ElectorService } from './elector.service';
import { BoardModule } from 'src/board/board.module';
import { UserModule } from 'src/user/user.module';
import { ElectorSubscriber } from './subscribers/elector.subscriber';

@Module({
    imports: [
        TypeOrmModule.forFeature([Elector]),
        BoardModule,
        UserModule
    ],
    exports: [
        TypeOrmModule,
        ElectorService
    ],
    providers: [
        ElectorResolver, 
        ElectorService, 
        // ElectorSubscriber
    ]
})
export class ElectorModule {}
