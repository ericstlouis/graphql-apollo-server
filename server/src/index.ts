import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/type-def";
import { resolvers } from "./schema/resolver";


const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: () => {
        return {name: "Monique"};
    },
    csrfPrevention: true, 
    cache: 'bounded', });

server.listen().then(({url}) => {
    console.log(`api is running: ${url} :)`);
})