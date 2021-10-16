import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {
  applyGraphQL,
  gql,
} from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import { message } from "./content.ts";

const typeDefs = gql`
  type Dino {
    name: String
    image: String
  }

  type Query {
    getDinos: [Dino!]!
  }
`;

const dinos = [
  {
    name: "TRex",
    image: "https://www.example.com",
  },
];

const resolvers = {
  Query: {
    getDinos: () => dinos,
  },
};

const graphQLService = await applyGraphQL<Router>({
  typeDefs,
  resolvers,
  Router,
});

const app = new Application();

app.use(graphQLService.routes(), graphQLService.allowedMethods());

app.use((ctx) => {
  ctx.response.body = message;
});

await app.listen({ port: 8000 });
