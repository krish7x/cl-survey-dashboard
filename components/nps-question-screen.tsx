"use client";
import { Button } from "flowbite-react";
import { useState } from "react";

export default function NpsQuestionPage(props: { surveyData: any, onSubmit: any }) {
  const { surveyData, onSubmit } = props;
  const [rating, setRating] = useState(0);

  const handleEmojiClick = (val: number) => {
    setRating(val);
  }

  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="w-full flex justify-center bg-slate-50 p-5">
        <img src="/carat.png" className="h-10 self-center" />
      </div>
      <div>
        <h1 className="px-56 my-10 text-txtBlack font-semibold  text-3xl text-center">
          {surveyData.title}
        </h1>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col">
            <h5 className="text-surveyGreen font-light text-center">
              Definitely
            </h5>
            <div className="flex flex-row">
              <div className="flex flex-col" onClick={() => handleEmojiClick(10)}>
                <img src="/10.svg" className={`px-5 h-16 ${rating===10? 'bg-gray-300 rounded-lg p-1': '' }`}/>
                <h5 className="text-surveyGreen font-light text-center py-5">
                  10
                </h5>
              </div>
              <div className="flex flex-col" onClick={() => handleEmojiClick(9)}>
                <img src="/9.svg" className={`px-5 h-16 ${rating===9? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyGreen font-light text-center py-5">
                  9
                </h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-surveyYellow font-light text-center">Maybe</h5>
            <div className="flex flex-row" >
              <div className="flex flex-col" onClick={() => handleEmojiClick(8)}>
                <img src="/8.svg" className={`px-5 h-16 ${rating===8? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyYellow font-light text-center py-5">
                  8
                </h5>
              </div>
              <div className="flex flex-col" onClick={() => handleEmojiClick(7)}>
                <img src="/7.svg" className={`px-5 h-16 ${rating===7? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyYellow font-light text-center py-5">
                  7
                </h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-surveyRed font-light text-center">
              Not at all
            </h5>
            <div className="flex flex-row">
              <div className="flex flex-col" onClick={() => handleEmojiClick(6)}>
                <img src="/6.svg" className={`px-5 h-16 ${rating===6? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyRed font-light text-center py-5">
                  6
                </h5>
              </div>
              <div className="flex flex-col" onClick={() => handleEmojiClick(5)}>
                <img src="/5.svg" className={`px-5 h-16 ${rating===5? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyRed font-light text-center py-5">
                  5
                </h5>
              </div>
              <div className="flex flex-col" onClick={() => handleEmojiClick(4)}>
                <img src="/4.svg" className={`px-5 h-16 ${rating===4? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyRed font-light text-center py-5">
                  4
                </h5>
              </div>
              <div className="flex flex-col" onClick={() => handleEmojiClick(3)}>
                <img src="/3.svg" className={`px-5 h-16 ${rating===3? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyRed font-light text-center py-5">
                  3
                </h5>
              </div>
              <div className="flex flex-col" onClick={() => handleEmojiClick(2)}>
                <img src="/2.svg" className={`px-5 h-16 ${rating===2? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyRed font-light text-center py-5">
                  2
                </h5>
              </div>
              <div className="flex flex-col" onClick={() => handleEmojiClick(1)}>
                <img src="/1.svg" className={`px-5 h-16 ${rating===1? 'bg-gray-300 rounded-lg p-1': '' }`} />
                <h5 className="text-surveyRed font-light text-center py-5">
                  1
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button color="blue" pill style={{ width: 100, marginTop: 50 }}
        onClick={() => onSubmit(rating)}>
        Next
      </Button>
    </div>
  );
}
