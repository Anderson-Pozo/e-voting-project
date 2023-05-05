import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEProcessInput, UpdateEProcessInput } from './dto';
import { ElectoralProcessService } from './electoral-process.service';
import { ElectoralProcess } from './entities';

@Resolver()
export class ElectoralProcessResolver {
    constructor(
        private readonly eprocessService: ElectoralProcessService 
    ) { }

    @Query(() => [ElectoralProcess])
    async getAllElectoralProcess() {
        return await this.eprocessService.getAll()
    }

    @Query(() => ElectoralProcess)
    async getElectoralProcess(
        @Args("id", { type: () => ID }) id: string
    ){
        return await this.eprocessService.findOne(id)
    }

    @Mutation(() => ElectoralProcess)
    async createElectoralProcess(
        @Args("eproccess") eproccess: CreateEProcessInput
    ){
        return await this.eprocessService.create(eproccess);
    }

    @Mutation(() => ElectoralProcess)
    async updateElectoralProcess(
        @Args("updateEprocess") updateEprocess: UpdateEProcessInput
    ) {
        return await this.eprocessService.update(updateEprocess);
    }

    @Mutation(() => ElectoralProcess)
    async deleteElectoralProcess(
        @Args("id", { type: () => ID }) id: string
    ){
        return await this.eprocessService.delete(id) 
    }

    @Mutation(() => Boolean)
    async switchElectoralProcessState(
        @Args("id", { type: () => ID }) id: string
    ) {
        return await this.eprocessService.switchState(id);
    }
}
