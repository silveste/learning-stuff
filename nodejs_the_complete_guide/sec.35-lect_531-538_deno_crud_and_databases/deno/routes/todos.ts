import { Router } from 'https://deno.land/x/oak/mod.ts';
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

import { getDb, TodoSchema } from '../helpers/db.ts';

const router = new Router();

router.get('/todos', async (ctx) => {
  const rawTodos = await getDb().collection<TodoSchema>('todos').find();
  const todos = rawTodos.map(todo => {
    return {
      id: todo._id.$oid,
      text: todo.text
    }
  })
  ctx.response.body = { todos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;
  const id = await getDb().collection<TodoSchema>('todos').insertOne({ text: data.text });
  const todo = {
    id: id.$oid,
    text: data.text
  };
  ctx.response.body = { message: 'Created todo!', todo };
});

router.put('/todos/:todoId', async (ctx) => {
  const id = ctx.params.todoId!;
  const { text } = await ctx.request.body().value;
  await getDb().collection<TodoSchema>('todos').updateOne(
    {_id: ObjectId(id)},
    { $set: { text } }
  )
  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:todoId', async (ctx) => {
  const id = ctx.params.todoId!;
  await getDb().collection<TodoSchema>('todos').deleteOne(
    {_id: ObjectId(id)}
  );
  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
