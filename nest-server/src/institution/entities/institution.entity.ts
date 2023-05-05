import { Entity, Column, OneToMany } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { Base } from "src/common/entities";
import { ElectoralProcess } from "src/electoral-process/entities";

// Institucion
@ObjectType({ description: "Institucion" })
@Entity()
export class Institution extends Base {
    @Field()
    @Column({length: 30})
    name: string
    
    @Field({ nullable: true })
    @Column({length: 100, nullable: true})
    image?: string
    
    @Field()
    @Column({length: 30})
    province: string
    
    @Field()
    @Column({length: 30})
    canton: string
    
    @Field()
    @Column({length: 30})
    parish: string

    @OneToMany(() => ElectoralProcess, (elecProcess) => elecProcess.institution)
    electoralProcess: ElectoralProcess[]
}
