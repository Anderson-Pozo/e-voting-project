import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstitutionInput, UpdateInstitutionInput } from './dto';
import { Institution } from './entities';

@Injectable()
export class InstitutionService {
    constructor(
        @InjectRepository(Institution)
        private readonly repository: Repository<Institution>
    ){}

    async getAll(): Promise<Institution[]> {
        const institutions = await this.repository.find()
        return institutions
    }

    async findOne(id: string): Promise<Institution>{
        const institution = await this.repository.findOneBy({ id });
        if (!institution) 
            throw new NotFoundException(`No existe la institucion con el id ${id}`)
        
        return institution
    }

    async create(institution: CreateInstitutionInput){
        try {
            const newInstitution = this.repository.create(institution);
            return await this.repository.save(newInstitution)
        } catch (error) {
            throw new Error("No se pudo crear");
        }
    }

    
    async update(updateInstitution: UpdateInstitutionInput){
        try {
            await this.findOne(updateInstitution.id);
            const institution = await this.repository.preload(updateInstitution);
            return this.repository.save(institution);
        } catch (error) {
            console.log({error});
            throw new Error("No se pudo actualizar");
        }
    }
    
    async delete(id: string) {
        try {
            const institution = await this.repository.findOneBy({ id })
            return await this.repository.remove(institution);
        } catch (error) {
            throw new Error("No se pudo borrar");
        }
    }
}
