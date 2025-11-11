import { NextResponse } from "next/server";
import {db} from "../../../lib/firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";
import { title } from "process";
export async function GET() {
  const snapshot = await getDocs(collection(db, "tasks"));
  const tasks = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  return NextResponse.json(tasks);
}
export async function POST(req: Request) {
    try{
        const body = await req.json();
        const newTaskRef = await addDoc(collection(db, "tasks"),{
            title : body.title,
            description: body.description || "",
            completed: false,
            priority: body.priority || "medium",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return NextResponse.json({
            id: newTaskRef.id,
            title : body.title,
            description: body.description || "",
            completed: false,
            priority: body.priority || "medium",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    catch (error){
        console.error("POST/ api/task", error);
        return NextResponse.json({error: "Failed to add task"},{status: 500});
    }
 
    }