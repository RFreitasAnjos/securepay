"use client";

import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/navigation";

interface ButtonLogoutProps {
  text?: string;
}

export default function ButtonLogout({ text = "Sign Out" }: ButtonLogoutProps) {
  const { instance, inProgress } = useMsal();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={inProgress !== "none"}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {inProgress === "logout" ? "Signing out..." : text}
    </button>
  );
}
