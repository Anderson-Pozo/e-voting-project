import { Field, ID, InputType } from "@nestjs/graphql";
import { IsEmail, IsIn, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

@InputType({ description: "Input creacion Mjrv" })
export class CreateMjrvInput {
    @Field()
    @IsString()
    @MaxLength(10)
    @MinLength(10)
    dni: string
    
    @Field()
    @IsString()
    @MaxLength(30)
    firstname: string
    
    @Field()
    @IsString()
    @MaxLength(30)
    lastname: string

    @Field({ nullable: true })
    @MaxLength(30)
    @IsEmail()
    @IsOptional()
    email: string
    
    @Field()
    @IsString()
    @IsIn(["Presidente", "Secretario", "Vocal"])
    position: string

    @Field(() => ID)
    @IsUUID()
    board: string

    // @Field(() => User)
    // user: User
}