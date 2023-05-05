import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "src/common/entities";
import { Mjrv } from "src/mjrv/entities";
import { Elector } from "src/elector/entities";
import { ElectoralProcess } from "src/electoral-process/entities";
import { Field, ObjectType } from "@nestjs/graphql";

// Junta electoral
@ObjectType({ description: "Junta" })
@Entity()
export class Board extends Base {
    @Field()
    @Column({ type: "int" })
    number: number
    
    @Field()
    @Column({ length: "100" })
    place: string

    //TODO Precent?
    
    @Field(() => ElectoralProcess)
    @ManyToOne(() => ElectoralProcess, (elProc) => elProc.board)
    electoralProcess: ElectoralProcess

    @OneToMany(() => Mjrv, (mjrv) => mjrv.board)
    mjrv: Mjrv[]

    @OneToMany(() => Elector, (elect) => elect.board)
    elector: Elector[]
}