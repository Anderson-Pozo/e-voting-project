import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { List } from './entities';
import { ListService } from './list.service';

@Resolver()
export class ListResolver {
    constructor(
        private readonly listService: ListService
    ){}

    @Query(() => [List])
    async getAllLists(): Promise<List[]>{
        return await this.listService.getAll()
    }

    @Mutation(() => List)
    async createList(
        @Args("list") list: CreateListInput
    ){
        return await this.listService.create(list)
    }

    @Mutation(() => List)
    async updateList(
        @Args("updateList") updateList: UpdateListInput 
    ){
        return await this.listService.update(updateList);
    }
}
