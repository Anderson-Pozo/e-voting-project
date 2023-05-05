import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { Base } from "src/common/entities";
import { Board } from "src/board/entities";
import { User } from "src/user/entities";

// Miembro junta receptora del voto
@ObjectType({ description: "Entidad MJRV" })
@Entity()
export class Mjrv extends Base {
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
    @Column({ length: 20 })
    position: string

    @Field(() => Board)
    @ManyToOne(() => Board, (board) => board.electoralProcess)
    board: Board

    @Field(() => User)
    @OneToOne(() => User, (user)=> user.mjrv)
    @JoinColumn()
    user: User
}
