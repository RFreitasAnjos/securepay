"use client";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { getMsalConfig } from "@/config/msalconfig";
import { ReactNode, useEffect, useState } from "react";

export function MSALProvider({ children }: { children: ReactNode }) {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null);

  useEffect(() => {
    // Only create MSAL instance on client side
    if (typeof window !== "undefined") {
      const instance = new PublicClientApplication(getMsalConfig());
      setMsalInstance(instance);
    }
  }, []);

  if (!msalInstance) {
    return <>{children}</>;
  }

  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
}

export default MSALProvider;
