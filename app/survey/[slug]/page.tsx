"use client";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/utils/axios";
import { usePathname } from "next/navigation";
import { AxiosError } from "axios";
import { Spinner } from "flowbite-react";
import ThanksScreen from "@/components/thanks-screen";
import NpsQuestionPage from "@/components/nps-question-screen";
import OtherQuestionPage from "@/components/other-question-screen";
import Image from "next/image";

export default function Survey() {
  const [currentPage, setCurrentPage] = useState("NPS");
  const [npsQuestion, setNpsQuestions] = useState<any>({});
  const [otherQuestions, setOtherQuestions] = useState<any>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [survey, setSurvey] = useState<any>();
  const path = usePathname();

  useEffect(() => {
    const npsQuestionList = survey?.template?.templateJsonData?.filter(
      (item: any) => item.optionTypeName === "NPS Rating"
    );
    const otherQuestionList = survey?.template?.templateJsonData?.filter(
      (item: any) => item.optionTypeName !== "NPS Rating"
    );
    if (npsQuestionList?.length >= 1) {
      setCurrentPage("NPS");
      setNpsQuestions(npsQuestionList[0]);
    }
    if (otherQuestionList?.length >= 1) {
      setOtherQuestions(
        otherQuestionList.map((item: any, key: any) => ({
          id: key + 1,
          ...item,
        }))
      );
    }
  }, [survey]);

  useEffect(() => {
    const surveyId = path.split("/")[2];
    if (surveyId) {
      axiosInstance
        .get(`/surveys/fetch/${surveyId}`)
        .then((res) => {
          if (res.data) {
            setIsAuthorized(true);
            if (res.data?.isSurveyCompleted) {
              setCurrentPage("THANKS");
            } else {
              setSurvey({
                contactId: res.data?.contactId,
                uuid: res.data?.uuid,
                ...res.data?.survey,
              });
            }
          }
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setIsAuthorized(false);
          }
        });
    }
  }, [path]);

  const handleNPSSubmit = async (val: any) => {
    setNpsQuestions((prevState: any) => ({ ...prevState, rating: val }));
    const reqData = {
      contactId: survey.contactId,
      surveyId: survey.id,
      score: val,
      uuid: survey.uuid,
      surveyResponseData: null,
    };

    await axiosInstance.post(`/responses/create`, reqData).then((res) => {
      if (res.data) {
        setCurrentPage("OTHER");
      }
    });
  };

  const handleOthersSubmit = async () => {
    const reqData = {
      contactId: survey.contactId,
      surveyId: survey.id,
      uuid: survey.uuid,
      surveyResponseData: [npsQuestion, ...otherQuestions],
    };

    await axiosInstance.post(`/responses/create`, reqData).then((res) => {
      if (res.data) {
        setCurrentPage("THANKS");
      }
    });
  };

  return (
    <>
      {isAuthorized ? (
        <div className="flex flex-col w-full h-full">
          <div className="w-full flex justify-center bg-slate-50 p-3 md:p-5 fixed top-0 z-10">
            <Image
              src={"/carat.png"}
              className="h-10 self-center"
              width={200}
              height={40}
              alt={"caratlane-logo"}
            />
          </div>
          <div className="flex flex-col w-full h-auto">
            {currentPage === "NPS" && (
              <NpsQuestionPage
                surveyData={npsQuestion}
                onSubmit={handleNPSSubmit}
              />
            )}
            {currentPage === "OTHER" && (
              <OtherQuestionPage
                questions={otherQuestions}
                onSubmit={handleOthersSubmit}
                setOtherQuestions={setOtherQuestions}
              />
            )}
            {currentPage === "THANKS" && (
              <ThanksScreen flag={currentPage === "THANKS"} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <Spinner size={"xl"} />
        </div>
      )}
    </>
  );
}
