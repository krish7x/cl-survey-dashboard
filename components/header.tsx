"use client";

import { signOut } from "next-auth/react";

export default function Header({ user }) {
  return (
    <div className="px-4 md:px-6 py-3 md:py-4 flex justify-between w-full">
      <h1>Hello {user.name}!!</h1>
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
