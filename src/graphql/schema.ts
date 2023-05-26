import { Field, ObjectType, InputType } from "type-graphql"

@ObjectType()
export class Artist {
    @Field()
    ArtistId!: number
    @Field()
    Name!: string
}

@InputType()
export class UserInput implements Pick<Artist, "Name" | "ArtistId"> {
    @Field()
    ArtistId!: number
    @Field()
    Name!: string
}