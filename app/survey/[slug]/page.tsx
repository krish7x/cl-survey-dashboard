"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import { ISurveyPage } from "@/types";

export default function Survey() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [survey, setSurvey] = useState<ISurveyPage | null>(null);
  const path = usePathname();

  useEffect(() => {
    const surveyId = path.split("/")[2];
    if (surveyId) {
      axiosInstance
        .get(`/surveys/fetch/${surveyId}`)
        .then((res) => {
          if (res.data) {
            setIsAuthorized(true);
            setSurvey(res.data);
          }
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setIsAuthorized(false);
          }
        });
    }
  }, [path]);

  return (
    <div className="w-full h-full bg-white">
      <h1>hello world!</h1>
    </div>
  );
}
