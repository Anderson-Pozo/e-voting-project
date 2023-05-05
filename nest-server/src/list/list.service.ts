import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { ElectoralProcessService } from 'src/electoral-process/electoral-process.service';
import { Repository } from 'typeorm';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { List } from './entities';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private readonly repository: Repository<List>,
        private readonly eprocessService: ElectoralProcessService,
        private readonly commonService: CommonService,
        
    ){}

    async getAll(): Promise<List[]>{
        const lists = await this.repository.find({
            relations: {
                electoralProcess: true
            }
        })
        return lists
    }
    
    async findOne(id: string) {
        const list = await this.repository.findOneBy({ id });
        if (!list)
            this.commonService.handleErrors({
                code: 'http-404',
                detail: `Lista con id ${ id } no encontrada`
            })
        return list;
    }

    async create(list: CreateListInput){
        try {
            const electoralProcess = await this.eprocessService.findOne(list.electoralProcess);
            const newList = this.repository.create({
                ...list,
                electoralProcess
            });
            return await this.repository.save(newList);
        } catch (error) {
            throw new Error("No se pudo crear la lista")
        }
    }
    
    async update(updateList: UpdateListInput){
        
        await this.findOne(updateList.id);

        try {
            const electoralProcess = await this.eprocessService.findOne(updateList.electoralProcess);
            const list = await this.repository.preload({
                ...updateList,
                electoralProcess
            });
            return await this.repository.save(list);
        } catch (error) {
            console.error({ error })
            this.commonService.handleErrors({
                ...error,
                detail: "No se pudo actualizar la lista"
            })
            // throw new Error("No se pudo actualizar la lista");
        }
    }

    
}
