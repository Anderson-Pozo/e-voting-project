import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "src/common/entities";
import { Vote } from "src/vote/entities/vote.entity";
import { Candidate } from "src/candidate/entities";
import { ElectoralProcess } from "src/electoral-process/entities";
import { Field, ObjectType } from "@nestjs/graphql";

// Lista
@ObjectType({ description: "Lista de candidatos" })
@Entity()
export class List extends Base {
    @Field()
    @Column({ length: 30 })
    name: string
    
    @Field()
    @Column({ length: 30 })
    color: string
    
    @Field({ nullable: true })
    @Column({ length: 100, nullable: true })
    logo: string

    @Field({ nullable: true })
    @Column({ length: 100, nullable: true })
    slogan: string

    @Field(() => ElectoralProcess)
    @ManyToOne(() => ElectoralProcess, (elProc) => elProc.board)
    electoralProcess: ElectoralProcess

    @OneToMany(() => Candidate, (candidate) => candidate.list)
    candidate: Candidate[]

    @OneToMany(() => Vote, vote => vote.list)
    vote: Vote[]
}
