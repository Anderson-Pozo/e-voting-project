import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateInstitutionInput, UpdateInstitutionInput } from './dto';
import { Institution } from './entities';
import { InstitutionService } from './institution.service';

@Resolver()
export class InstitutionResolver {
    constructor(
        private readonly institutionService: InstitutionService
    ) { }

    @Query(() => [Institution])
    async getAllInstitutions(): Promise<Institution[]> {
        return this.institutionService.getAll()
    }

    @Query(() => Institution)
    async getInstitution(
        @Args("id", { type: () => ID }) id: string
    ): Promise<Institution> {
        return this.institutionService.findOne(id);
    }

    @Mutation(() => Institution)
    async createInstitution(
        @Args("institution") institution: CreateInstitutionInput
    ) {
        return await this.institutionService.create(institution);
    }

    @Mutation(() => Institution)
    async updateInstitution(
        @Args("institution") institution: UpdateInstitutionInput
    ) {
        return await this.institutionService.update(institution);
    }

    @Mutation(() => Institution)
    async deleteInstitution(
        @Args("id", { type: () => ID }) id: string
    ) {
        return await this.institutionService.delete(id);
    }
}
