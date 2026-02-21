"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/buttons/PrincipalButton";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Access Denied</h1>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p className="font-semibold">✗ Authentication Failed or Unauthorized</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4 text-gray-700">
          You are not authenticated or your session has expired. Please log in to continue.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Return to Home
        </button>
      </div>
    </main>
  );
}
