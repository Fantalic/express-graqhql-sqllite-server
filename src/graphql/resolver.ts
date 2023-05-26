import { Query, Resolver, Mutation, Arg } from "type-graphql"
import { UserInput, Artist } from "./schema.js"
import database from "../db/database.js"

@Resolver(() => Artist)
export class UsersResolver {

    @Query(() => [Artist])
    async getArtists(): Promise<Artist[]> {
        return await database.all("select * from artists") as Artist[]
    }

    @Query(() => Artist)
    async getUser(@Arg("id") id: number): Promise<Artist | undefined> {
        return 
    }

    @Mutation(() => Artist)
    async createUser(@Arg("input") input: UserInput): Promise<Artist> {
        const user = {
            ...input,
        }        
        return user
    }

    @Mutation(() => Artist)
    async updateUser(
        @Arg("id") id: number,
        @Arg("input") input: UserInput
    ): Promise<Artist> {

        const updatedUser = {
            ...input,
        }

        return updatedUser
    }
}