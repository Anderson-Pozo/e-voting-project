import { Field, ID, InputType } from "@nestjs/graphql"
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator"

@InputType({ description: "Input de creacion de una lista" })
export class CreateListInput {
    @Field()
    @IsString()
    // @MaxLength(30)
    name: string
    
    @Field()
    @IsString()
    @MaxLength(30)
    color: string
    
    @Field({ nullable: true })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    logo: string
    
    @Field({ nullable: true })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    slogan: string

    @Field(() => ID)
    @IsUUID()
    electoralProcess: string
}