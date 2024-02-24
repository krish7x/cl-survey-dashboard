"use client";

import { googleUserAtom, userAtom } from "@/store/atom";
import { IGoogleUser } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { useSetAtom } from "jotai";
import { memo, useEffect } from "react";

export default memo(function GoogleUserSetup({ user }: { user: IGoogleUser }) {
  const setGoogleUser = useSetAtom(googleUserAtom);
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    setGoogleUser(user);
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      axiosInstance.get(`/users/get?email=${user?.email}`).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        setUser(res.data[0]);
      });
    } else {
      setUser(JSON.parse(userStr));
    }
  }, [user, setUser, setGoogleUser]);
  return <></>;
});
