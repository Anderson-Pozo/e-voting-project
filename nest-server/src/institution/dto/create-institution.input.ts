import { Field, InputType } from "@nestjs/graphql";
import { Institution } from "../entities";
import { IsOptional, IsString } from "class-validator";

@InputType({ description: "Input Institucion" })
export class CreateInstitutionInput implements Partial<Institution> {
    @Field()
    @IsString()
    name: string;
    
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    image?: string;
    
    @Field()
    @IsString()
    province: string;
    
    @Field()
    @IsString()
    canton: string;
    
    @Field()
    @IsString()
    parish: string;
}