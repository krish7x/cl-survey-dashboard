"use client";

import { ClipboardPen } from "lucide-react";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { axiosInstance } from "@/utils/axios";
import { userAtom, userLocalStorageAtom } from "@/store/atom";
import { IGoogleUser } from "@/types";
import Avatar from "./avatar";

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
    <div className="px-4 md:px-10 py-3 md:py-4 flex items-center justify-between w-full">
      <div className="flex gap-3 items-center">
        <ClipboardPen />
        <h1 className="text-txtBlack font-semibold ">Hi, {user.name} 👋</h1>
      </div>
      <Avatar {...user} />
    </div>
  );
}
