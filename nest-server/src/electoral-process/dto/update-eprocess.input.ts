import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CreateEProcessInput } from "./create-eprocess.input";

@InputType({ description: "Input Proceso Electoral" })
export class UpdateEProcessInput extends PartialType(CreateEProcessInput) {
    
    @Field(() => ID)
    @IsUUID()
    id: string
}