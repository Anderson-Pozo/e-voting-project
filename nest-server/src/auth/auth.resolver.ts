import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthResponse } from './types/auth-response.type';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/entities';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput)
  }

  @Query(() => AuthResponse, { name: "revalidateToken" })
  @UseGuards(JwtAuthGuard)
  revalidateToken(
    @CurrentUser() user: User
  ): AuthResponse {
    return this.authService.revalidateToken(user);
  }
}
