import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { message } from "./content.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = message;
});

await app.listen({ port: 8000 });
