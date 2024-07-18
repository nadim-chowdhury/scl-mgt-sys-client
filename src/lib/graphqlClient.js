import { GraphQLClient } from "graphql-request";

const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_SERVER_URL);

export default graphqlClient;
