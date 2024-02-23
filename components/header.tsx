"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { axiosInstance } from "@/utils/axios";
import { userAtom, userLocalStorageAtom } from "@/store/atom";
import { IGoogleUser } from "@/types";
import Avatar from "./avatar";
import Image from "next/image";
import src from "../public/logo.png";

export default function Header({ user }: { user: IGoogleUser }) {
  const setUser = useSetAtom(userAtom);
  const setLocalUser = useSetAtom(userLocalStorageAtom);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      axiosInstance.get(`/users/get?email=${user.email}`).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        setUser(res.data[0]);
      });
    } else {
      setUser(JSON.parse(userStr));
    }
  }, [user, setUser, setLocalUser]);

  return (
    <div className="px-4 md:px-10 py-3 md:py-4 border-b border-b-navBorder flex items-center justify-between w-full">
      <div className="flex gap-1 items-center">
        <Image src={src} alt="survey" width={32} height={32} className="mb-1" />
        <div className="flex  gap-1 justify-center items-center">
          <h1 className="text-txtBlack font-semibold">Hi, {user.name} </h1>
          <div className="animate-wave">👋</div>
        </div>
      </div>
      <Avatar {...user} />
    </div>
  );
}
