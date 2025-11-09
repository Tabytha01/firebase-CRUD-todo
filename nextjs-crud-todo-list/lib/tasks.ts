import { db } from "../app/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import type { Task } from "./types";

const tasksCol = collection(db, "tasks");

export async function createTask(
  data: Omit<Task, "id">
): Promise<string> {
  const ref = await addDoc(tasksCol, data);
  return ref.id;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<void> {
  const ref = doc(tasksCol, id);
  await updateDoc(ref, updates);
}

export async function deleteTask(id: string): Promise<void> {
  const ref = doc(tasksCol, id);
  await deleteDoc(ref);
}

export function subscribeUserTasks(
  userEmail: string,
  listener: (tasks: Task[]) => void
): () => void {
  const q = query(tasksCol, where("userEmail", "==", userEmail));
  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Task, "id">),
    }));
    listener(tasks);
  });
}

export async function getUserTasks(userEmail: string): Promise<Task[]> {
  const q = query(tasksCol, where("userEmail", "==", userEmail));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Task, "id">) }));
}