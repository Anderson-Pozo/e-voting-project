import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities';
import { Vote } from './entities';
import { CreateVoteInput } from './dto/create-vote.input';
import { VoteByList } from './types/vote-by-list';
import { ElectorService } from 'src/elector/elector.service';
import { ListService } from 'src/list/list.service';
import { Elector } from 'src/elector/entities';

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(Vote)
        private readonly repository: Repository<Vote>,
        private readonly listService: ListService,
        private readonly electorService: ElectorService,
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ){}

    async getVotesByProccess(eprocessId: string): Promise<Vote[]>{        
        const votes = await this.repository.find({
            relations: {
                list: true
            },
            where: {
                list: {
                    id: eprocessId
                }
            }
        });
        return votes
    }

    async getVotesByList(): Promise<VoteByList[]>{
        const lists = await this.listService.getAll();
        let result: VoteByList[] = [];
        
        for (const { name, id } of lists) {
            result.push({
                name,
                votes: await this.countVotesByList(id)
            })
        }
        
        return result;
    }

    private async countVotesByList(listId: string){
        return await this.repository.countBy({
            list: { id: listId }
        });
    }

    async save({ electoralProccess, list: listId }: CreateVoteInput, user: User){
        const list = await this.listService.findOne(listId);
        const elector = await this.electorService.findByUserId(user.id);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction();
        
        await this.electorService.verifyIfElectorVote(elector);

        try {
            const vote = queryRunner.manager.create(Vote, { list, electoralProccess });
            const newVote = await queryRunner.manager.save(vote);
                      
            await queryRunner.manager.update(Elector, elector.id, { exercisedVote: true });
            
            await queryRunner.commitTransaction();
            
            return newVote;
        } catch (error) {
            console.error({ error })
            await queryRunner.rollbackTransaction();
            throw new BadRequestException("No se pudo procesar el voto")
        } finally {
            await queryRunner.release()
        }
    }
}
