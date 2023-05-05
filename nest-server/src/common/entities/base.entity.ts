import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export abstract class Base extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @CreateDateColumn()
    createdAt: Date
    
    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}