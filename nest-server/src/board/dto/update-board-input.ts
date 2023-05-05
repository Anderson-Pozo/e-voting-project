import { Field, ID, InputType, PartialType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"
import { CreateBoardInput } from "./create-board-input"

@InputType({ description: "Input actualizacion Junta" })
export class UpdateBoardInput extends PartialType(CreateBoardInput) {
    
    @Field(() => ID)
    @IsUUID()
    id: string
}

