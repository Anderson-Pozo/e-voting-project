import { UseGuards } from '@nestjs/common/decorators';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/user/entities';
import { CreateVoteInput } from './dto/create-vote.input';
import { Vote } from './entities';
import { VoteByList } from './types/vote-by-list';
import { VoteService } from './vote.service';

@UseGuards( JwtAuthGuard )
@Resolver()
export class VoteResolver {
    constructor(
        private readonly voteService: VoteService
    ) { }

    @Query(() => [VoteByList])
    async getVotesByList(
        // @CurrentUser() user: User
    ) {
        // console.log({ user });
        return await this.voteService.getVotesByList();
    }

    @Mutation(() => Vote)
    async saveVote(
        @Args("vote") vote: CreateVoteInput,
        @CurrentUser([ValidRoles.elector]) user: User
    ) {
        console.log({ user });
        return await this.voteService.save(vote, user);
    }
}
