import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Base } from './entities/base.entity';
import { CommonService } from './common.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Base])
    ],
    exports: [
        TypeOrmModule,
        CommonService
    ],
    providers: [CommonService]
})
export class CommonModule {}
