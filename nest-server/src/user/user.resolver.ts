import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities';
import { ValidRolesArg } from './dto/args/roles.arg';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
@UseGuards(JwtAuthGuard)
@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ){}

    @Query(() => [User])
    async getAllUsers(
        @Args('processId', { type: () => ID }, ParseUUIDPipe) processId: string,
        @CurrentUser([ValidRoles.admin]) user: User
        // @Args() validRoles: ValidRolesArg
    ) {
        return await this.userService.getAll(processId);
    }
}
