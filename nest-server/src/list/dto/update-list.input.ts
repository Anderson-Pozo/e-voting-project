import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CreateListInput } from "./create-list.input";

@InputType({ description: "Input actualizacion de lista" })
export class UpdateListInput extends PartialType(CreateListInput) {
    
    @Field(() => ID)
    @IsUUID()
    id: string
}