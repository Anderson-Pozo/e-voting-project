import { Field, ID, InputType, Int, OmitType } from "@nestjs/graphql"
import { IsNumber, IsString, IsUUID, Min } from "class-validator"

@InputType({ description: "Input creacion Junta" })
export class CreateBoardInput {
    @Field(() => Int)
    @IsNumber()
    @Min(1)
    number: number
    
    @Field()
    @IsString()
    place: string
    
    @Field(() => ID)
    @IsUUID()
    electoralProcess: string
}

@InputType({ description: "Input creacion masiva Junta" })
export class CreateBulkBoardsInput extends OmitType(CreateBoardInput, [
    'electoralProcess'
] as const){}
