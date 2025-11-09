"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "../../lib/firebase.js";

export default function Header() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setEmail(user?.email ?? null);
    });
    return () => unsub();
  }, []);

  return (
    <header className="w-full border-b border-black/10 dark:border-white/10">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">Task App</Link>
        {email ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{email}</span>
            <button
              onClick={() => signOut(auth)}
              className="rounded bg-black text-white px-3 py-1 text-sm dark:bg-white dark:text-black"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}