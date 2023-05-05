import { Field, ID, InputType } from "@nestjs/graphql"
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator"


@InputType({ description: "Input de creacion de candidato" })
export class CreateCandidateInput {
    @Field()
    @IsString()
    @MaxLength(30)
    firstname: string
    
    @Field()
    @IsString()
    @MaxLength(30)
    lastname: string
    
    @Field({ nullable: true })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    photo: string
    
    @Field()
    @IsString()
    @MaxLength(20)
    dignity: string
    
    @Field(() => ID)
    @IsUUID()
    list: string
}