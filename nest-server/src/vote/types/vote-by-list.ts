import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: 'Total de votos por lista' })
export class VoteByList {
    @Field()
    name: string

    @Field()
    votes: number
}
