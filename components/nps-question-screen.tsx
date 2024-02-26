"use client";
import { Button } from "flowbite-react";
import { useState } from "react";

export default function NpsQuestionPage(props: {
  surveyData: any;
  onSubmit: any;
}) {
  const { surveyData, onSubmit } = props;
  const [currentRating, setCurrentRating] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleEmojiClick = (val: number) => {
    setCurrentRating(val);
    setSubmitDisabled(false);
  };

  const renderEmoji = (rating: any, src: any, color: string) => {
    return (
      <div
        key={rating}
        className="flex flex-col"
        onClick={() => handleEmojiClick(rating)}
      >
        <img
          src={src}
          className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
            rating === currentRating ? "bg-gray-300 rounded-lg" : ""
          } sm:px-1`}
          alt={`Emoji ${rating}`}
        />
        <h5 className={`${color} font-light text-center py-2 md:py-5`}>
          {rating}
        </h5>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full items-center pt-24">
      <div>
        <h1 className="px-4 sm:px-8 md:px-16 lg:px-24 my-4 sm:my-6 md:my-8 lg:my-10 text-txtBlack font-semibold text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center">
          {surveyData.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {/* Group 1 */}
          <div className="flex flex-col md:mr-4 mb-4 md:mb-0">
            <h5 className="text-surveyGreen font-light text-center mb-2 md:mb-4">
              Definitely
            </h5>
            <div className="flex flex-row">
              {renderEmoji(10, "/10.svg", "text-surveyGreen")}
              {renderEmoji(9, "/9.svg", "text-surveyGreen")}
            </div>
          </div>

          {/* Group 2 */}
          <div className="flex flex-col md:mx-4 mb-4 md:mb-0">
            <h5 className="text-surveyYellow font-light text-center mb-2 md:mb-4">
              Maybe
            </h5>
            <div className="flex flex-row">
              {renderEmoji(8, "/8.svg", "text-surveyYellow")}
              {renderEmoji(7, "/7.svg", "text-surveyYellow")}
            </div>
          </div>

          {/* Group 3 */}
          <div className="flex flex-col md:ml-4">
            <h5 className="text-surveyRed font-light text-center mb-2 md:mb-4">
              Not at all
            </h5>
            <div className="flex flex-row">
              {renderEmoji(6, "/6.svg", "text-surveyRed")}
              {renderEmoji(5, "/5.svg", "text-surveyRed")}
              {renderEmoji(4, "/4.svg", "text-surveyRed")}
              {renderEmoji(3, "/3.svg", "text-surveyRed")}
              {renderEmoji(2, "/2.svg", "text-surveyRed")}
              {renderEmoji(1, "/1.svg", "text-surveyRed")}
            </div>
          </div>
        </div>
      </div>
      <Button
        color="blue"
        pill
        style={{ width: 100, marginTop: 50 }}
        disabled={submitDisabled}
        onClick={() => onSubmit(currentRating)}
      >
        Next
      </Button>
    </div>
  );
}
