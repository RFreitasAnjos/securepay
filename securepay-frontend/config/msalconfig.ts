import { Configuration, LogLevel } from "@azure/msal-browser";

export const getMsalConfig = (): Configuration => {
  return {
    auth: {
      clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
      authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}`,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000",
      postLogoutRedirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
          }
        },
        piiLoggingEnabled: false,
      },
      allowNativeBroker: false,
    },
  };
};

export const loginRequest = {
  scopes: ["User.Read","openid", "profile", "email"],
};

export const logoutRequest = {
  postLogoutRedirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000",
};