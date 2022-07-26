import { gql } from "apollo-server";


export const typeDefs = gql`
    type User {
        id: ID!
        name: String
        username: String
        age: Int
        nationality: nationality
        friends: [User!]
        favoriteMovies: [Movie!]
    } 

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    enum nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
        BAHAMAS
    }

    # Input types
    input createUserInput {
        name: String!
        username: String!
        age: Int!
        nationality: nationality = BAHAMAS
    }

    input updateUserNameInput {
        id: ID!
        newUserName: String!
        }


    # Root types
    type Query {
        user(id: ID!): User!
        users: [User!]!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    type Mutation {
        createUser(input: createUserInput!): User
        updateUserName(input: updateUserNameInput!): User
        deleteUser(id: ID!): User
    }

`