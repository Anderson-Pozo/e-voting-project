import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateMjrvInput } from './dto';
import { Mjrv } from './entities';
import { BoardService } from 'src/board/board.service';
import { User } from 'src/user/entities';
import { UpdateMjrvInput } from './dto/update-mjrv.input';

@Injectable()
export class MjrvService {

    constructor(
        @InjectRepository(Mjrv)
        private readonly mjrvRepository: Repository<Mjrv>,
        private readonly boardService: BoardService,
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ){}

    async getAll(): Promise<Mjrv[]>{
        const mjrvs = this.mjrvRepository.find({
            relations: {
                board: true
            }
        });
        return mjrvs;
    }

    async findOne(id: string){
        const mjrv = await this.mjrvRepository.findBy({ id });
        if (!mjrv) {
            throw new NotFoundException(`Mjrv con id ${ id } no encontrado`);
        }
        return mjrv;
    }

    async create(createMjrv: CreateMjrvInput){

        const { board: boardMjrv, dni, firstname, lastname, email, position } = createMjrv;
        const board = await this.boardService.findOne(boardMjrv);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction();

        try {
            const user = queryRunner.manager.create(User, {
                fullname: firstname.concat(" ", lastname),
                username: dni,
                email,
                password: bcrypt.hashSync(dni, 10),
                roles: ['mjrv']
            });
            
            await queryRunner.manager.save(user);

            const mjrv = queryRunner.manager.create(Mjrv, {
                ...createMjrv,
                position: position.toString(),
                board,
                user
            });

            const newMjrv = await queryRunner.manager.save(mjrv);

            await queryRunner.commitTransaction();
    
            return newMjrv;
            
        } catch (error) {
            console.error({ error })
            await queryRunner.rollbackTransaction();
            throw new BadRequestException("No se pudo crear el mjrv")
        } finally {
            await queryRunner.release()
        }
    }

    async update (updateMjrv: UpdateMjrvInput){
        await this.findOne(updateMjrv.id);

        try {
            const board = await this.boardService.findOne(updateMjrv.board);
            const mjrv = await this.mjrvRepository.preload({
                ...updateMjrv,
                board
            });
            return await this.mjrvRepository.save(mjrv);
        } catch (error) {
            console.error({ error })
            throw new Error("No se pudo actualizar el mjrv");
        }
    }
    
}
