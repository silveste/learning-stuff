import { Application } from "https://deno.land/x/oak/mod.ts";

import todosRoutes from './routes/todos.ts';
import { connect } from './helpers/db.ts';

connect();

const app = new Application();

let counter: number = 0;

app.use(async (ctx, next) => {
  counter++;
  console.log(`Incoming request: ${counter}`);
  await next();
});

app.use(async (ctx, next) => {
  const headers = ctx.response.headers;
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 8000 });
