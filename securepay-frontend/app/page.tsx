"use client";

import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/navigation";
import Carrousel from "@/components/ui/carrousel/carrousel";
import Menu from "@/components/ui/menu/menu";
import ButtonLogin from "@/components/ui/buttons/ButtonLogin";
import ButtonLogout from "@/components/ui/buttons/ButtonLogout";

export default function Home() {
  const { accounts, inProgress } = useMsal();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [previousAccountCount, setPreviousAccountCount] = useState(0);

  // Wait for hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Handle redirect after successful login
  useEffect(() => {
    if (!isHydrated || inProgress === "startup") {
      return;
    }

    const currentAccountCount = accounts?.length ?? 0;

    // If accounts increased (user just logged in), redirect to dashboard
    if (currentAccountCount > previousAccountCount && currentAccountCount > 0) {
      // Small delay to ensure popup is fully closed
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 300);
      return () => clearTimeout(timer);
    }

    setPreviousAccountCount(currentAccountCount);
  }, [accounts, inProgress, isHydrated, previousAccountCount, router]);

  const isAuthenticated = accounts && accounts.length > 0;
  const isLoading = !isHydrated || inProgress === "startup";

  if (!isHydrated) {
    return null; // Prevent hydration mismatch
  }

  return (
    <main>
      <Menu />
      <Carrousel />
      <div className="container p-4">
        <h2 className="text-xl font-bold mb-4">Welcome to SecurePay</h2>
        <p className="mb-4">Your secure payment solution.</p>

        {isLoading ? (
          <div className="text-center text-gray-600">Loading authentication...</div>
        ) : isAuthenticated ? (
          <div className="space-y-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="font-semibold">
                ✓ Authentication Successful - {accounts[0].name}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Go to Dashboard
              </button>
              <ButtonLogout />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Please sign in with your Microsoft account to get started.
            </p>
            <ButtonLogin text="Sign in with Microsoft" />
          </div>
        )}
      </div>
    </main>
  );
}
