import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm"
import { Base } from "src/common/entities"
import { List } from "src/list/entities"
import { Elector } from "src/elector/entities"
import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: 'Entidad de voto' })
@Entity()
export class Vote extends Base {
    @Field(() => List)
    @ManyToOne(() => List, list => list.vote)
    list: List
    
    @Field()
    @CreateDateColumn()
    votingTime: Date
    
    @Field(() => ID)
    @Column()
    electoralProccess: string
}