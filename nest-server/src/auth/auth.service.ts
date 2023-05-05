import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './types/auth-response.type';
import { User } from 'src/user/entities';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { username, password } = loginInput;
    // TODO: Verify if user is active and belongs to electoral process 
    const user = await this.userService.findOne({ username });
    const token = this.getJwtToken(user.id)

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException("La contraseña no coincide");
    }

    return {
      user,
      token
    }
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOneById(id);

    if (!user.isActive)
      throw new UnauthorizedException("Usuario inactivo");

    delete user.password

    return user
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.id)
    return { token, user }
  }
}
