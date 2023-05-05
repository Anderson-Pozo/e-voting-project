import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType({ description: "Input login" })
export class LoginInput {
    @Field()
    @IsString()
    username: string;
    
    @Field()
    @IsString()
    password: string;
}