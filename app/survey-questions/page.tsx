'use client'
'use client'
import { useState, useEffect } from "react";
import { surveyJson } from "@/utils/surveyJson";
import NpsQuestionPage from "@/components/nps-question-screen";
import OtherQuestionPage from "@/components/other-question-screen";

export default function CustomerSurvey(){
    const [currentPage, setCurrentPage] = useState('NPS');
    const [npsQuestion, setNpsQuestions] = useState<any>({});
    const [otherQuestions, setOtherQuestions] = useState<any>([]);

    useEffect(() => {
        const npsQuestionList = surveyJson.filter((item) => item.optionTypeName === "NPS Rating");
        const otherQuestionList = surveyJson.filter((item) => item.optionTypeName !== "NPS Rating")
        if(npsQuestionList.length >= 1){
            setCurrentPage('NPS');
            setNpsQuestions(npsQuestionList[0])
        }
        if(otherQuestionList.length >= 1){
            setOtherQuestions(otherQuestionList)
        }
    }, [])

    const handleNPSSubmit = (val: any) => {
        setNpsQuestions((prevState: any) => ({...prevState, rating: val}))
        setCurrentPage("OTHER")
    }

    const handleOthersSubmit = () => {

    }

    return (
        <div className="flex flex-col w-full h-full">
            {currentPage==="NPS" && <NpsQuestionPage surveyData={npsQuestion} 
                                onSubmit={handleNPSSubmit}
                                        />}
            {currentPage==="OTHER" && <OtherQuestionPage questions={otherQuestions}
                    onSubmit={handleOthersSubmit} />}
        </div>
    )
}