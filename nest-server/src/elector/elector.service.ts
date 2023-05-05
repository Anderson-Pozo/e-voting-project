import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BoardService } from 'src/board/board.service';
import { User } from 'src/user/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateBulkElectorsInput, CreateElectorInput } from './dto/create-elector.input';
import { UpdateElectorInput } from './dto/update-elector.input';
import { Elector } from './entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ElectorService {
    constructor(
        @InjectRepository(Elector)
        private readonly repository: Repository<Elector>,
        private readonly boardService: BoardService,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ){}

    async getAll(boardId: string){
        const board = await this.boardService.findOne(boardId);
        const electors = await this.repository.find({
            relations: {
                board: true,
                user: true
            },
            where: {
                board: {
                    id: board.id
                }
            }
        })
        return electors;
    }

    async findOne(id: string){
        const elector = await this.repository.findOneBy({ id });
        if (!elector) {
           throw new NotFoundException(`No se encontró el elector con id ${ id }`); 
        }
        return elector;
    }
    
    async findByUserId(id: string){
        const elector = await this.repository.findOneBy({ user: { id } });
        if (!elector) {
           throw new NotFoundException(`No se encontró el elector con userId ${ id }`); 
        }
        return elector;
    }

    async create(elector: CreateElectorInput){
        const { board: electorBoard, dni, firstname, lastname, email } = elector;
        const board = await this.boardService.findOne(electorBoard);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction();

        try {
            const user = queryRunner.manager.create(User, {
                fullname: firstname.concat(" ", lastname),
                username: dni,
                email,
                password: bcrypt.hashSync(dni, 10),
                roles: ['elector']
            })
            
            await queryRunner.manager.save(user);

            const createdElector = queryRunner.manager.create(Elector, {
                ...elector,
                board,
                user
            });

            const newElector = await queryRunner.manager.save(createdElector);

            await queryRunner.commitTransaction();
    
            return newElector;
            
        } catch (error) {
            console.error({ error })
            await queryRunner.rollbackTransaction();
            throw new BadRequestException("No se pudo crear el elector")
        } finally {
            await queryRunner.release()
        }
    }

    async bulkCreate(boardId: string, electors: CreateBulkElectorsInput[]){
        const board = await this.boardService.findOne(boardId);
        let createdElectors : Elector[] = [];
        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction();
        
        try {
            for (const ele of electors) {
                const user = queryRunner.manager.create(User, {
                    fullname: ele.firstname.concat(" ", ele.lastname),
                    username: ele.dni,
                    email: ele.email,
                    password: bcrypt.hashSync(ele.dni, 10),
                    roles: ['elector']
                });
                await queryRunner.manager.save(user);

                const elector = queryRunner.manager.create(Elector, {
                    ...ele,
                    board,
                    user
                });
    
                const newElector = await queryRunner.manager.save(elector);
                createdElectors.push(newElector);
            }

            await queryRunner.commitTransaction();
            
            return createdElectors;
            
        } catch (error) {
            console.error({ error })
            await queryRunner.rollbackTransaction();
            throw new BadRequestException("No se pudo crear la lista de electores")
        } finally {
            await queryRunner.release()
        }
    }

    async update(updateElector: UpdateElectorInput){
        await this.findOne(updateElector.id);
        const board = await this.boardService.findOne(updateElector.board);
        try {
            const elector = await this.repository.preload({
                ...updateElector,
                board
            });
            return await this.repository.save(elector);
        } catch (error) {
            console.error({ error });
            throw new Error("No se actualizar el elector");
        }
    }

    async verifyIfElectorVote(elector: Elector){
        if(elector.exercisedVote){
            throw new BadRequestException(`Elector con ci ${ elector.dni } ya ejerció el voto`)
        }
    }

}
