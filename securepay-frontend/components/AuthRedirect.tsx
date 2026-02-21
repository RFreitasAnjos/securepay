"use client";

import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/navigation";

export function AuthRedirect() {
  const { accounts, inProgress } = useMsal();
  const router = useRouter();

  useEffect(() => {
    // Wait for MSAL to finish initialization
    if (inProgress === "startup") {
      return;
    }

    // Check if user is authenticated
    if (accounts && accounts.length > 0) {
      router.push("/dashboard");
    }
  }, [accounts, inProgress, router]);

  return null;
}

export default AuthRedirect;
