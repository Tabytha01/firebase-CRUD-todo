"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase.js";
import Protected from "./components/Protected";
import type { Task } from "../lib/types";
import {
  createTask,
  deleteTask,
  subscribeUserTasks,
  updateTask,
} from "../lib/tasks";

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Low");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const userEmail = user?.email ?? null;
      setEmail(userEmail);
      if (userEmail) {
        return subscribeUserTasks(userEmail, setTasks);
      }
      return undefined;
    });
    return () => unsub();
  }, []);

  const isEditing = useMemo(() => !!editingId, [editingId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setError(null);
    try {
      if (editingId) {
        await updateTask(editingId, { title, description, priority });
        setEditingId(null);
      } else {
        const newTask: Omit<Task, "id"> = {
          title,
          description,
          priority,
          completed: false,
          userEmail: email,
        };
        await createTask(newTask);
      }
      setTitle("");
      setDescription("");
      setPriority("Low");
    } catch (err: any) {
      setError(err?.message ?? "Failed to save task");
    }
  }

  async function toggleCompleted(task: Task) {
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (err) {
      console.error(err);
    }
  }

  function startEdit(task: Task) {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
  }

  async function removeTask(id: string) {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Protected>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">
          {email ? `Hello, ${email}` : "Dashboard"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          {error && (
            <div className="text-sm text-red-600" role="alert">{error}</div>
          )}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border rounded px-3 py-2"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border rounded px-3 py-2"
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
            className="border rounded px-3 py-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            type="submit"
            className="rounded bg-black text-white px-3 py-2 dark:bg-white dark:text-black"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </form>

        <section className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="border rounded p-3 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleCompleted(t)}
                  />
                  <span className="font-semibold">{t.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                    {t.priority}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {t.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-sm underline"
                  onClick={() => startEdit(t)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600 underline"
                  onClick={() => removeTask(t.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No tasks yet. Add one above.
            </p>
          )}
        </section>
      </main>
    </Protected>
  );
}
