'use client';

import NpsQuestionPage from '@/components/nps-question-screen';
import OtherQuestionPage from '@/components/other-question-screen';
import ThanksScreen from '@/components/thanks-screen';
import { IFetchSurvey, ITemplateQuestion } from '@/types';
import { axiosInstance } from '@/utils/axios';
import { AxiosError } from 'axios';
import { Spinner } from 'flowbite-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Survey() {
  const [currentPage, setCurrentPage] = useState('NPS');
  const [npsQuestion, setNpsQuestions] = useState<ITemplateQuestion>();
  const [otherQuestions, setOtherQuestions] = useState<ITemplateQuestion[]>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<IFetchSurvey>();
  const path = usePathname();

  useEffect(() => {
    const npsQuestionList = surveyData?.template?.templateJsonData?.filter(
      item => item.optionTypeName === 'NPS Rating',
    ) as ITemplateQuestion[];

    const otherQuestionList = surveyData?.template?.templateJsonData?.filter(
      item => item.optionTypeName !== 'NPS Rating',
    ) as ITemplateQuestion[];
    if (npsQuestionList?.length >= 1) {
      setCurrentPage('NPS');
      setNpsQuestions(npsQuestionList[0]);
    }

    if (otherQuestionList?.length >= 1) {
      setOtherQuestions(
        otherQuestionList.map((item: ITemplateQuestion, key: number) => ({
          id: key + 1,
          ...item,
        })),
      );
    }
  }, [surveyData]);

  useEffect(() => {
    const surveyId = path.split('/')[2];
    if (surveyId) {
      axiosInstance
        .get(`/surveys/fetch/${surveyId}`)
        .then(res => {
          if (res.data) {
            setIsAuthorized(true);
            if (res.data?.isSurveyCompleted) {
              setCurrentPage('THANKS');
            } else {
              setSurveyData({
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

  const handleNPSSubmit = async (score: number) => {
    const npsQues = { ...npsQuestion, rating: score };
    setNpsQuestions(npsQues as ITemplateQuestion);
    const reqData = {
      contactId: surveyData?.contactId,
      surveyId: surveyData?.id,
      score,
      uuid: surveyData?.uuid,
      surveyResponseData: null,
    };

    await axiosInstance.post(`/responses/create`, reqData).then(res => {
      if (res.data) {
        setCurrentPage('OTHER');
      }
    });
  };

  const handleOthersSubmit = async () => {
    const reqData = {
      contactId: surveyData?.contactId,
      surveyId: surveyData?.id,
      uuid: surveyData?.uuid,
      surveyResponseData: [
        npsQuestion,
        ...(otherQuestions as ITemplateQuestion[]),
      ],
    };

    await axiosInstance.post(`/responses/create`, reqData).then(res => {
      if (res.data) {
        setCurrentPage('THANKS');
      }
    });
  };

  return (
    <>
      {isAuthorized ? (
        <div className="flex flex-col w-full h-full">
          <div className="w-full flex justify-center bg-slate-50 p-3 md:p-5 fixed top-0 z-10">
            <Image
              src={'/carat.png'}
              className="h-10 self-center"
              width={200}
              height={40}
              alt={'caratlane-logo'}
            />
          </div>
          <div className="flex flex-col w-full h-auto">
            {currentPage === 'NPS' && (
              <NpsQuestionPage
                surveyData={npsQuestion}
                onSubmit={handleNPSSubmit}
              />
            )}
            {currentPage === 'OTHER' && (
              <OtherQuestionPage
                questions={otherQuestions as ITemplateQuestion[]}
                onSubmit={handleOthersSubmit}
                setOtherQuestions={setOtherQuestions}
              />
            )}
            {currentPage === 'THANKS' && <ThanksScreen flag={currentPage} />}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <Spinner size={'xl'} />
        </div>
      )}
    </>
  );
}
