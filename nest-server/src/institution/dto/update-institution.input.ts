import { Field, InputType, PartialType, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CreateInstitutionInput } from "./create-institution.input";

@InputType({ description: "Input Updated Institucion" })
export class UpdateInstitutionInput extends PartialType(CreateInstitutionInput) {
    @Field(() => ID)
    @IsUUID()
    id: string;
}