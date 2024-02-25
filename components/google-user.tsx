"use client";

import { userAtom } from "@/store/atom";
import { IGoogleUser } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { useSetAtom } from "jotai";
import { memo, useEffect } from "react";

export default memo(function GoogleUserSetup({ user }: { user: IGoogleUser }) {
  const setUser = useSetAtom(userAtom);
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      axiosInstance.get(`/users/get?email=${user?.email}`).then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...res.data[0],
            googleUserName: user.name,
            googleUserEmail: user.email,
            googleUserImage: user.image,
            googleUserExpiry: user.expires,
          })
        );
        setUser(res.data[0]);
      });
    } else {
      setUser(JSON.parse(userStr));
    }
  }, [user, setUser]);
  return <></>;
});
