import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBulkElectorsInput, CreateElectorInput } from './dto/create-elector.input';
import { UpdateElectorInput } from './dto/update-elector.input';
import { ElectorService } from './elector.service';
import { Elector } from './entities';

@Resolver()
export class ElectorResolver {
    constructor(
        private readonly electorService: ElectorService
    ){}

    @Query(() => [Elector])
    async getAllElectors(
        @Args("boardId", { type: () => ID }, ParseUUIDPipe ) boardId: string
    ){
        return await this.electorService.getAll(boardId);
    }

    @Mutation(() => Elector)
    async createElector(
        @Args("elector") elector: CreateElectorInput
    ){
        return await this.electorService.create(elector)
    }

    @Mutation(() => [Elector])
    async createMasiveElector(
        @Args("createElector", { type: () => [CreateBulkElectorsInput] }) 
        createElector: CreateBulkElectorsInput[],
        @Args("boardId", { type: ()=> ID }, ParseUUIDPipe) boardId: string,
    ){
        return await this.electorService.bulkCreate(boardId, createElector);
    }

    @Mutation(() => Elector)
    async updateElector(
        @Args("elector") elector: UpdateElectorInput
    ){
        return await this.electorService.update(elector);
    }
}
