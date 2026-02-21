"use client";

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/msalconfig";
import { useState } from "react";

interface ButtonLoginProps {
  text?: string;
  onLoginSuccess?: () => void;
}

export default function ButtonLogin({ 
  text = "Sign in with Microsoft",
  onLoginSuccess
}: ButtonLoginProps) {
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await instance.loginRedirect(loginRequest);
      console.log("Login response:", response);
      // Login successful - the popup will close automatically
      // Notify parent component that login succeeded
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        // Reload the page to update auth state
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Login error:", error);
      // If user cancelled the popup, just close the loading state
      if (error.errorCode !== "AADB2C90118" && error.errorCode !== "user_cancelled") {
        console.error("Authentication failed:", error.errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Signing in..." : text}
    </button>
  );
}