import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CreateCandidateInput } from "./create-candidate.input";

@InputType({ description: "Input de actualizacion de candidato" })
export class UpdateCandidateInput extends PartialType(CreateCandidateInput) {
    @Field(() => ID)
    @IsUUID()
    id: string
}