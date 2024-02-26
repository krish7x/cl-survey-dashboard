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
        {/* <div className="flex flex-row justify-center">
          <div className="flex flex-col">
            <h5 className="text-surveyGreen font-light text-center">
              Definitely
            </h5>
            <div className="flex flex-row">
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(10)}
              >
                <img
                  src="/10.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 10 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyGreen font-light text-center py-5">
                  10
                </h5>
              </div>
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(9)}
              >
                <img
                  src="/9.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 9 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyGreen font-light text-center py-5">
                  9
                </h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-surveyYellow font-light text-center">Maybe</h5>
            <div className="flex flex-row">
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(8)}
              >
                <img
                  src="/8.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 8 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyYellow font-light text-center py-5">
                  8
                </h5>
              </div>
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(7)}
              >
                <img
                  src="/7.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 7 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
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
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(6)}
              >
                <img
                  src="/6.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 6 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyRed font-light text-center py-5">
                  6
                </h5>
              </div>
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(5)}
              >
                <img
                  src="/5.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 5 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyRed font-light text-center py-5">
                  5
                </h5>
              </div>
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(4)}
              >
                <img
                  src="/4.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 4 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyRed font-light text-center py-5">
                  4
                </h5>
              </div>
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(3)}
              >
                <img
                  src="/3.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 3 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyRed font-light text-center py-5">
                  3
                </h5>
              </div>
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(2)}
              >
                <img
                  src="/2.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 2 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyRed font-light text-center py-5">
                  2
                </h5>
              </div>
              <div
                className="flex flex-col"
                onClick={() => handleEmojiClick(1)}
              >
                <img
                  src="/1.svg"
                  className={`px-5 h-16 transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
                    rating === 1 ? "bg-gray-300 rounded-lg" : ""
                  }`}
                />
                <h5 className="text-surveyRed font-light text-center py-5">
                  1
                </h5>
              </div>
            </div>
          </div>
        </div> */}
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
