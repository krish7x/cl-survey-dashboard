"use client";
import { Button } from "flowbite-react";
import Image from "next/image";
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

  const RenderEmoji = ({
    rating,
    src,
    color,
  }: {
    rating: number;
    src: string;
    color: string;
  }) => {
    return (
      <div
        key={rating}
        className="flex flex-col cursor-pointer"
        onClick={() => handleEmojiClick(rating)}
      >
        <Image
          src={src}
          className={`px-4 py-2 md:w-24 ${
            color === "text-surveyRed" ? "w-20 md:w-24" : "w-24 md:w-28"
          }  transform scale-115 hover:scale-110 focus:scale-110 transition-transform ${
            rating === currentRating ? "bg-gray-300 rounded-lg" : ""
          } sm:px-1`}
          alt={`Emoji ${rating}`}
          width={72}
          height={72}
        />
        <h5 className={`${color} text-center py-2 md:py-5`}>{rating}</h5>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full items-center pt-16 md:pt-24 pb-10">
      <h1 className="px-4 sm:px-8 md:px-16 sm:leading-2 lg:px-24 my-4 sm:my-4 md:my-8 lg:my-10 text-txtBlack font-semibold text-md md:text-3xl text-center">
        {surveyData.title}
      </h1>
      <div className="flex flex-col md:gap-4 md:flex-row justify-center items-center">
        {/* Group 1 */}
        <div className="flex flex-col md:mr-4">
          <h5 className="text-surveyGreen font text-center mb-2 md:mb-4">
            Definitely
          </h5>
          <div className="flex gap-2 md:gap-3">
            {[10, 9].map((val) => (
              <RenderEmoji
                key={"emoji" + val}
                rating={val}
                src={`/${val}.svg`}
                color="text-surveyGreen"
              />
            ))}
          </div>
        </div>

        {/* Group 2 */}
        <div className="flex flex-col md:mx-4">
          <h5 className="text-surveyYellow font text-center mb-2 md:mb-4">
            Maybe
          </h5>
          <div className="flex gap-2 md:gap-3">
            {[8, 7].map((val) => (
              <RenderEmoji
                key={"emoji" + val}
                rating={val}
                src={`/${val}.svg`}
                color="text-surveyYellow"
              />
            ))}
          </div>
        </div>

        {/* Group 3 */}
        <div className="flex flex-col md:ml-4">
          <h5 className="text-surveyRed font text-center mb-2 md:mb-4">
            Not at all
          </h5>
          <div className="flex gap-1 md:gap-3 justify-center flex-wrap md:flex-nowrap">
            {[6, 5, 4, 3, 2, 1].map((val) => (
              <RenderEmoji
                key={"emoji" + val}
                rating={val}
                src={`/${val}.svg`}
                color="text-surveyRed"
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        color="blue"
        pill
        className="w-40 mt-2"
        disabled={submitDisabled}
        onClick={() => onSubmit(currentRating)}
      >
        Next
      </Button>
    </div>
  );
}
