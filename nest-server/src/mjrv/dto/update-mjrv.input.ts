import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CreateMjrvInput } from "./create-mjrv.input";

@InputType({ description: 'Input de actualizacion mjrv' })
export class UpdateMjrvInput extends PartialType(CreateMjrvInput){
    @Field()
    @IsUUID()
    id: string
}