"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase.js";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/auth/login");
    } catch (err: any) {
      setError(err?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-sm p-6 border rounded flex flex-col gap-3"
      >
        <h1 className="text-xl font-semibold">Register</h1>
        {error && (
          <div className="text-sm text-red-600" role="alert">{error}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black text-white px-3 py-2 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {loading ? "Creating…" : "Create Account"}
        </button>
      </form>
    </div>
  );
}