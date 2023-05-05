import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { Base } from "src/common/entities";
import { Board } from "src/board/entities";
import { List } from "src/list/entities";
import { Institution } from "src/institution/entities";

// Proceso Electoral
@ObjectType({ description: "Proceso electoral" })
@Entity()
export class ElectoralProcess extends Base {
    
    @Field()
    @Column()
    processDate: Date
    
    @Field()
    @Column()
    initialHour: Date
    
    @Field()
    @Column()
    finalHour: Date
    
    @Field()
    @Column({ length: 50 })
    name: string
    
    @Field()
    @Column({ length: 15 })
    period: string
    
    @Field()
    @Column({default: false, nullable: true})
    isActive: boolean
    
    @Field(() => Institution)
    @ManyToOne(() => Institution, (inst) => inst.electoralProcess, { nullable: true })
    institution: Institution

    @OneToMany(() => Board, (board) => board.electoralProcess)
    board: Board[]
    
    @OneToMany(() => List, (list) => list.electoralProcess)
    list: List[]
}
