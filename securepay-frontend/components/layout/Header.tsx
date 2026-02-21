import { MsalProvider } from "@azure/msal-react";
import ButtonEvent from "../ui/buttons/ButtonEvent";
import { PublicClientApplication } from "@azure/msal-browser";

export default function Header(){

   return(
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
         <h1 className="text-2xl font-bold">SecurePay</h1>
         <ButtonEvent text="Login" />
      </header>
   )
}