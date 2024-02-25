"use client";

import { useAtomValue } from "jotai";
import { userAtom } from "@/store/atom";
import Avatar from "./avatar";
import Image from "next/image";
import src from "../public/logo.png";
import HeaderSkeleton from "./header-skeleton";

export default function Header() {
  const user = useAtomValue(userAtom);

  console.log({ user });
  return (
    <div className="px-4 md:pl-6 md:pr-10 py-3 md:py-4 border-b border-b-navBorder flex items-center justify-between w-full">
      {user?.googleUserEmail ? (
        <div className="flex gap-1 items-center">
          <Image
            src={src}
            alt="survey"
            width={32}
            height={32}
            className="mb-1"
          />
          <div className="flex  gap-1 justify-center items-center">
            <h1 className="text-txtBlack font-semibold">
              Hi, {user?.googleUserName}{" "}
            </h1>
            <div className="animate-wave">👋</div>
          </div>
        </div>
      ) : (
        <HeaderSkeleton />
      )}
      <Avatar
        email={user?.googleUserEmail}
        name={user?.googleUserName}
        image={user?.googleUserImage}
      />
    </div>
  );
}
