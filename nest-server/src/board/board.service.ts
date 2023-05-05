import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectoralProcessService } from 'src/electoral-process/electoral-process.service';
import { CreateBoardInput, CreateBulkBoardsInput, UpdateBoardInput } from './dto';
import { Board } from './entities';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly repository: Repository<Board>,

        private readonly eprocessService: ElectoralProcessService
    ){}

    async getAll(): Promise<Board[]>{
        const boards = await this.repository.find({
            relations:{
                electoralProcess: true
            }
        });
        return boards
    }

    async findOne(id: string): Promise<Board>{
        const board = await this.repository.findOneBy({ id });
        if (!board) 
            throw new NotFoundException(`No se encontró la junta con id ${ id }`);
        return board
    }


    async create(createBoard: CreateBoardInput){
        try {

            const electoralProcess = await this.eprocessService.findOne(
                createBoard.electoralProcess
            );

            const board = this.repository.create({
                ...createBoard,
                electoralProcess
            });
            return await this.repository.save(board);
            
        } catch (error) {
            throw new Error("No se pudo crear la junta");
        }
    }

    async bulkCreate(idEProcess: string, boardsInput: CreateBulkBoardsInput[]){
        try {

            const electoralProcess = await this.eprocessService.findOne(idEProcess);

            const boards = boardsInput.map(board => {
                return {
                    ...board,
                    electoralProcess
                }
            })
            
            const query = await this.repository.createQueryBuilder()
                .insert()
                .into(Board)
                .values(boards)
                .execute()
                
            const ides = query.identifiers.map(iden => iden.id);

            const createdBoards = await this.repository.findBy({ 
                id: In(ides),
            });

            console.log({ createdBoards });
                        
            return createdBoards;

        } catch (error) {
            throw new Error("No se pudo crear las juntas");
        }
    }

    async update(updateBoard: UpdateBoardInput){
        try {
            await this.findOne(updateBoard.id);

            const electoralProcess = await this.eprocessService.findOne(
                updateBoard.electoralProcess
            );

            const board = await this.repository.preload({
                ...updateBoard,
                electoralProcess
            });
            
            return await this.repository.save(board);
        
        } catch (error) {
            throw new Error("No se pudo actualizar la junta");
        }
    }

    async delete(id: string){
        const board = await this.findOne(id);
        return await this.repository.remove(board);
    }

    async getByElectoralProcess(){}
    
}
