"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const type_def_1 = require("./schema/type-def");
const resolver_1 = require("./schema/resolver");
const server = new apollo_server_1.ApolloServer({ typeDefs: type_def_1.typeDefs, resolvers: resolver_1.resolvers, csrfPrevention: true, cache: 'bounded', });
server.listen().then(({ url }) => {
    console.log(`api is running: ${url} :)`);
});
//# sourceMappingURL=index.js.map