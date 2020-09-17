import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = []

router.get('/todos', (ctx) => {
  ctx.response.body = { todos };
});
router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text,
  };
  todos.push(newTodo);
  ctx.response.body = { message: 'Todo created', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const id = ctx.params.todoId!;
  const { text } = await ctx.request.body().value;
  const tIndex = todos.findIndex((todo) => todo.id === id);
  todos[tIndex] = { id, text };
  ctx.response.body = { message: 'Todo updated', todo: todos[tIndex] };
});
router.delete('/todos/:todoId', (ctx) => {
    const id = ctx.params.todoId!;
    todos = todos.filter((todo) => todo.id !== id);
    ctx.response.body = { message: 'Todo deleted' };
});

export default router;
