import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionService } from 'src/institution/institution.service';
import { Repository } from 'typeorm';
import { UpdateEProcessInput } from './dto';
import { CreateEProcessInput } from './dto/create-eprocess.input';
import { ElectoralProcess } from './entities';

@Injectable()
export class ElectoralProcessService {

    constructor(
        @InjectRepository(ElectoralProcess)
        private readonly repository: Repository<ElectoralProcess>,

        private readonly institutionService: InstitutionService
    ) { }

    async getAll(): Promise<ElectoralProcess[]> {
        return await this.repository.find({
            relations: {
                institution: true
            }
        });
    }

    async findOne(id: string) {
        const eProcess = await this.repository.findOneBy({ id });
        if (!eProcess) 
            throw new NotFoundException(`No se pudo encontrar proceso con id ${id}`);
        return eProcess;
    }

    async create(data: CreateEProcessInput) {
        try {
            const institution = await this.institutionService.findOne(data.institution);

            const newEprocess = this.repository.create({
                ...data,
                institution
            });

            return await this.repository.save(newEprocess);

        } catch (error) {
            throw new Error("No se pudo crear el proceso electoral");
        }
    }

    async update(updateEprocess: UpdateEProcessInput) {
        try {
            await this.findOne(updateEprocess.id);
            const institution = await this.institutionService.findOne(updateEprocess.institution);
            
            const eprocess = await this.repository.preload({
                ...updateEprocess,
                institution
            });

            return this.repository.save(eprocess);
            
        } catch (error) {
            console.log({error});
            throw new Error("No se pudo actualizar proceso electoral");
        }
    }

    async delete(id: string) {
        const eprocess = await this.repository.findOneBy({ id })
        return await this.repository.remove(eprocess)
    }

    async switchState(id: string): Promise<boolean>{
        const eprocess = await this.findOne(id);
        eprocess.isActive = !eprocess.isActive
        const eprocessSwitched = await this.repository.save(eprocess);
        return eprocessSwitched.isActive
    }
}
