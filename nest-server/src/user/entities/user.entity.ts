import { Column, Entity, OneToOne } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { Base } from "src/common/entities";
import { Elector } from "src/elector/entities";
import { Mjrv } from "src/mjrv/entities";

@ObjectType({ description: "Entidad usuario" })
@Entity()
export class User extends Base{
    @Field()
    @Column({ length: 50 })
    fullname: string
    
    @Field()
    @Column({ length: 15, unique: true })
    username: string
    
    // @Field()
    @Column()
    password:string
    
    @Field(() => [String])
    @Column('text', { array: true, default: [''] })
    roles: string[]
    
    @Field()
    @Column({ default: true })
    isActive: boolean
    
    @Field({ nullable: true })
    @Column({ nullable: true })
    email?: string

    @OneToOne(() => Mjrv, (mjrv) => mjrv.user)
    mjrv: Mjrv
    
    @OneToOne(() => Elector, (elector) => elector.user)
    elector: Elector
}