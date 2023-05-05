import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "src/common/entities";
import { List } from "src/list/entities";
import { Field, ObjectType } from "@nestjs/graphql";

// Candidato
@ObjectType({ description: "Candidato" })
@Entity()
export class Candidate extends Base {
    @Field()
    @Column({ length: 30 })
    firstname: string
    
    @Field()
    @Column({ length: 30 })
    lastname: string
    
    @Field({ nullable: true })
    @Column({ length: 100, nullable: true })
    photo: string
    
    @Field()
    @Column({ length: 20 })
    dignity: string
    
    @Field(() => List)
    @ManyToOne(() => List, (list) => list.candidate)
    list: List
}