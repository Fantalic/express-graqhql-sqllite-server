import "reflect-metadata"
import { buildSchema } from "type-graphql"
import express from "express"
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { UsersResolver } from "./users/resolver.js"

async function main() {
    const schema = await buildSchema({
        resolvers: [UsersResolver],
        emitSchemaFile: true,
    })

    const app = express()

    const server = new ApolloServer({
        schema,
        plugins: []
    })
    await server.start()

    app.use(
        expressMiddleware(server, {
            context: async ({ req, res }) => {
              return { req, res }
            }
          })
    )
    app.listen(8000)

    console.log("Running a GraphQL API server at http://localhost:8000/graphql")
}

main()