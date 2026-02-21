"use client";

import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/navigation";
import ButtonLogout from "@/components/ui/buttons/ButtonLogout";

export default function Dashboard() {
  const { accounts } = useMsal();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!accounts || accounts.length === 0) {
      router.push("/unauthorized");
    }
  }, [accounts, router]);

  if (!accounts || accounts.length === 0) {
    return <div className="container mx-auto p-8">Redirecting...</div>;
  }

  const user = accounts[0];

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard - Authorized</h1>
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p className="font-semibold">✓ Authentication Successful</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Email:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Account Name:</span> {user.name}
          </p>
          <p className="text-gray-600 mt-4">
            You have successfully authenticated with Microsoft Azure AD.
          </p>
        </div>
        <div className="mt-6">
          <ButtonLogout />
        </div>
      </div>
    </main>
  );
}
