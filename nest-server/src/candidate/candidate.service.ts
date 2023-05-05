import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { ListService } from 'src/list/list.service';
import { Repository } from 'typeorm';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Candidate } from './entities';

@Injectable()
export class CandidateService {
    constructor(
        @InjectRepository(Candidate)
        private readonly repository: Repository<Candidate>,
        private readonly commonService: CommonService,
        private readonly listService: ListService,
    ){}

    async getAll(listId: string): Promise<Candidate[]>{
        const list = await this.listService.findOne(listId);
        const candidates = await this.repository.find({
            relations: {
                list: true
            },
            where: {
                list: {
                    id: list.id
                }
            }
        });
        return candidates;
    }

    async findOne(id: string) {
        const candidate = await this.repository.findOneBy({ id })
        if (!candidate)
            this.commonService.handleErrors({
                code: 'http-404',
                detail: `Candidato con id ${ id } no encontrado`
            })
        return candidate;
    }

    async create(candidate: CreateCandidateInput){
        try {
            const list = await this.listService.findOne(candidate.list);
            const newCandidate = this.repository.create({
                ...candidate,
                list
            });
            return await this.repository.save(newCandidate);
        } catch (error) {
            throw new Error("No se pudo crear el candidato")
        }
    }

    async update(updateCandidate: UpdateCandidateInput){
        await this.findOne(updateCandidate.id);
        const list = await this.listService.findOne(updateCandidate.list);
        
        try {
            const candidate = await this.repository.preload({
                ...updateCandidate,
                list
            });
            return await this.repository.save(candidate);
        } catch (error) {
            console.error({ error });
            throw new Error('No se pudo actualizar el candidato');
        }
    }

    async delete(id: string){}
}
