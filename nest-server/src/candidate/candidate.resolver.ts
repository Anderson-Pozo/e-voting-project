import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Candidate } from './entities';

@Resolver()
export class CandidateResolver {

    constructor(
        private readonly candidateService: CandidateService
    ){}

    @Query(() => [Candidate])
    async getAllCandidates(
        @Args("listId", { type: () => ID }, ParseUUIDPipe ) listId: string
    ){
        return await this.candidateService.getAll(listId);
    }

    @Mutation(() => Candidate)
    async createCandidate(
        @Args("candidate") candidate: CreateCandidateInput
    ){
        return await this.candidateService.create(candidate);
    }

    @Mutation(() => Candidate)
    async updateCandidate(
        @Args("updateCandidate") updateCandidate: UpdateCandidateInput 
    ){
        return await this.candidateService.update(updateCandidate);
    }
    
}
