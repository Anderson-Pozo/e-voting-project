import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType({ description: 'Input de creacion de voto' })
export class CreateVoteInput {
    @Field(() => ID)
    @IsUUID()
    list: string
    
    @Field(() => ID)
    @IsUUID()
    electoralProccess: string
}