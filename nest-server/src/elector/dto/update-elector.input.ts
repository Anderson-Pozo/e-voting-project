import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { CreateElectorInput } from "./create-elector.input";

@InputType({ description: 'Input de actualizacion de elector' })
export class UpdateElectorInput extends PartialType(CreateElectorInput){
    @Field()
    @IsUUID()
    id: string

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    exercisedVote?: boolean
}