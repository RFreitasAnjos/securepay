"use client";
import { handleClick } from "@/action/login";

interface ButtonEventProps {
   text: string;
}

export default function ButtonEvent ({ text }: ButtonEventProps) {
   return(
      <button onClick={ handleClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
         {text}
      </button>
   )
}