import "reflect-metadata"
import { buildSchema } from "type-graphql"
import express from "express"
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { UsersResolver } from "./users/resolver.js"
import database from "./db/database.js"

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

    await database.open("./db/chinook.db")

    const rows = await database.all("select name from sqlite_master where type='table'");
    //const rows = await database.all("select * from customers");


    console.log("Query result : ")
    console.log(rows)


    app.listen(8000)

    console.log("Running a GraphQL API server at http://localhost:8000/graphql")
}

main()