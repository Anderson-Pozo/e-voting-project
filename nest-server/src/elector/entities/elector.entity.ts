import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from "src/common/entities";
import { Board } from "src/board/entities";
import { User } from "src/user/entities";
import { Vote } from "src/vote/entities";
import { Field, ObjectType } from "@nestjs/graphql";

// Elector
@ObjectType({ description: 'Elector' })
@Entity()
export class Elector extends Base {
    @Field()
    @Column({ length: 10 })
    dni: string
    
    @Field()
    @Column({ length: 30 })
    firstname: string
    
    @Field()
    @Column({ length: 30 })
    lastname: string
    
    @Field({ nullable: true })
    @Column({ length: 30, nullable: true })
    email: string
    
    @Field()
    @Column({default: false})
    exercisedVote: boolean
    
    @Field( () => Board)
    @ManyToOne(() => Board, board => board.elector)
    board: Board
    
    // @OneToMany(() => Vote, vote => vote.elector)
    // vote: Vote[]
    
    @Field( () => User)
    @OneToOne(() => User, user => user.elector)
    @JoinColumn()
    user: User
}