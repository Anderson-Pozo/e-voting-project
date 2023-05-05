import { Field, ID, InputType, OmitType } from "@nestjs/graphql"
import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID, MaxLength } from "class-validator"


@InputType({ description: 'Input de creacion de elector' })
export class CreateElectorInput {
    @Field()
    @IsString()
    @MaxLength(10)
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
    
    @Field( () => ID)
    @IsUUID()
    board: string
}

@InputType({ description: "Input creacion masiva electores" })
export class CreateBulkElectorsInput extends OmitType(CreateElectorInput, [
    'board'
] as const){}