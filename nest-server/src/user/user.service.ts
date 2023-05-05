import { Injectable, NotFoundException, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {

    private logger = new Logger('UserService');

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getAll(processId: string): Promise<User[]> {
        return await this.userRepository.find({
            where: [
                {
                    mjrv: {
                        board: { electoralProcess: { id: processId } }
                    }
                },
                {
                    elector: {
                        board: { electoralProcess: { id: processId } }
                    }
                }
            ]
        });
    }

    async findOne({ id, username }: { id?: string, username: string }) {
        try {
            return await this.userRepository.findOneByOrFail({ id, username });
        } catch (error) {
            this.handleErrors({
                code: 'error-404',
                detail: `Usuario ${username} no encontrado`
            })
        }
    }

    async findOneById(id: string) {
        try {
            return await this.userRepository.findOneByOrFail({ id });
        } catch (error) {
            this.handleErrors({
                code: 'error-404',
                detail: `Usuario con id ${id} no encontrado`
            })
        }
    }

    async create(createUserInput: CreateUserInput) {
        const user = this.userRepository.create({
            ...createUserInput,
            password: bcrypt.hashSync(createUserInput.password, 10)
        });

        return await this.userRepository.save(user);
    }

    private handleErrors(error: any): never {

        this.logger.error(error)

        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }
        if (error.code === 'error-404') {
            throw new NotFoundException(error.detail)
        }

        throw new InternalServerErrorException('Check server logs')
    }

}
