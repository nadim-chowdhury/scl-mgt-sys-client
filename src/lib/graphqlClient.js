import { GraphQLClient } from "graphql-request";

const graphqlClient = new GraphQLClient("http://127.0.0.1:8000/graphql");

export default graphqlClient;
