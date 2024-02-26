"use client";
import { useState, useEffect } from "react";
import { surveyJson } from "@/utils/surveyJson";
import NpsQuestionPage from "@/components/nps-question-screen";
import OtherQuestionPage from "@/components/other-question-screen";
import { axiosInstance } from "@/utils/axios";
import { usePathname } from "next/navigation";
import { AxiosError } from "axios";
import ThanksScreen from "@/components/thanks-screen";

export default function CustomerSurvey() {
  const [currentPage, setCurrentPage] = useState("NPS");
  const [npsQuestion, setNpsQuestions] = useState<any>({});
  const [otherQuestions, setOtherQuestions] = useState<any>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [survey, setSurvey] = useState<any>();
  const path = usePathname();

  useEffect(() => {
    console.log("In survey use effect", survey);
    const npsQuestionList = survey?.template?.templateJsonData?.filter(
      (item: any) => item.optionTypeName === "NPS Rating"
    );
    const otherQuestionList = survey?.template?.templateJsonData?.filter(
      (item: any) => item.optionTypeName !== "NPS Rating"
    );
    if(survey?.isSurveyCompleted){
      setCurrentPage("THANKS_COMPLETED")
    }else {
      if (npsQuestionList?.length >= 1) {
        setCurrentPage("NPS");
        setNpsQuestions(npsQuestionList[0]);
      }
      if (otherQuestionList?.length >= 1) {
        setOtherQuestions(otherQuestionList.map((item: any, key: any) => ({id: key+1, ...item})));
      }
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
            setSurvey({
              contactId: res.data?.contactId,
              uuid: res.data?.uuid,
              isSurveyCompleted: res.data?.isSurveyCompleted,
              ...res.data?.survey});
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
      surveyResponseData: null
    }

    console.log("Create response req payload", reqData)

    await axiosInstance.post(`/responses/create`, reqData)
      .then((res) => {
        if(res.data){
          setCurrentPage("OTHER");
          console.log("Response of create survey response", res.data);
        }
      })
  };

  const handleOthersSubmit = async () => {
    const reqData = {
      contactId: survey.contactId,
      surveyId: survey.id,
      uuid: survey.uuid,
      surveyResponseData: [npsQuestion, ...otherQuestions]
    }
    console.log("Update response req payload", reqData);

    await axiosInstance.post(`/responses/create`, reqData)
    .then((res) => {
      if(res.data){
        console.log("Update response res", res.data);
        setCurrentPage("THANKS");
      }
    })

  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center bg-slate-50 p-5 fixed top-0 z-10">
        <img src="/carat.png" className="h-10 self-center" />
      </div>
      {currentPage === "NPS" && (
        <NpsQuestionPage surveyData={npsQuestion} onSubmit={handleNPSSubmit} />
      )}
      {currentPage === "OTHER" && (
        <OtherQuestionPage
          questions={otherQuestions}
          onSubmit={handleOthersSubmit}
          setOtherQuestions={setOtherQuestions}
        />
      )}
      {currentPage==="THANKS" && (
        <ThanksScreen flag="SURVEY_COMPLETED"/>
      )}
      {currentPage === "THANKS_COMPLETED" && <ThanksScreen flag="SURVEY_ALREADY_COMPLETED" />}
    </div >
  );
}
