"use client";

export default function Menu(){
   return(
      <nav className="bg-gray-700 text-white p-4">
         <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
         </ul>
      </nav>
   )
}