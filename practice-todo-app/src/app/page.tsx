'use client';

import { useState } from 'react';

type Todo = {
  id: string;
  value: string;
  completed: boolean;
};

export default function Home() {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now().toString(),
      value,
      completed: false,
    };

    if (!newTodo.value.trim()) return console.log('Write your todo');

    setTodos([...todos, newTodo]);
    setValue('');
  };

  const handleDeleteTodo = (todo: Todo) => {
    const filteredTodo = todos.filter((item) => item.id !== todo.id);

    setTodos(filteredTodo);
  };

  const handleCompletedTodo = (todo: Todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          console.log('Completed');

          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      }),
    );
  };

  const startEditTodo = (todo: Todo) => {
    setEditId(todo.id);
    setEditValue(todo.value);
  };

  const handleEditTodo = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editId) {
          return { ...todo, value: editValue };
        } else {
          return todo;
        }
      }),
    );

    setEditId('');
    setEditValue('');
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-slate-900/50">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-white">
          Todo App
        </h1>

        <form
          action="post"
          onSubmit={handleAddTodo}
          className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-inner shadow-slate-900/40 sm:flex-row"
        >
          <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-slate-300">
            Write your todo
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Buy milk, book tickets..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-2 text-base text-white outline-none transition focus:border-emerald-400 focus:ring focus:ring-emerald-500/30"
            />
          </label>

          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-6 py-2 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Add
          </button>
        </form>

        <div className="flex flex-col gap-4">
          {todos.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-800 bg-slate-900/40 px-4 py-6 text-center text-sm text-slate-400">
              Your list is empty. Add the first task to get started.
            </p>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between"
            >
              {editId === todo.id ? (
                <div className="flex w-full flex-col gap-3">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-2 text-base text-white outline-none transition focus:border-emerald-400 focus:ring focus:ring-emerald-500/30"
                  />

                  <button
                    onClick={() => handleEditTodo()}
                    className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-1 items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCompletedTodo(todo)}
                      className="h-5 w-5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/40"
                    />
                    <p
                      className={`text-base font-medium ${
                        todo.completed
                          ? 'text-slate-400 line-through'
                          : 'text-white'
                      }`}
                    >
                      {todo.value}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => startEditTodo(todo)}
                      className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo)}
                      className="rounded-lg border border-transparent px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
