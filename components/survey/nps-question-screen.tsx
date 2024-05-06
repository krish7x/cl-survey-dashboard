'use client';

import { ITemplateQuestion } from '@/types';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';

export default function NpsQuestionPage(props: {
  surveyData?: ITemplateQuestion;
  onSubmit: (value: number) => void;
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
        className="flex cursor-pointer flex-col"
        onClick={() => handleEmojiClick(rating)}
      >
        <Image
          src={src}
          className={`px-4 py-2 md:w-24 ${
            color === 'text-custom-16' ? 'w-20 md:w-24' : 'w-24 md:w-28'
          }  scale-115 transform transition-transform hover:scale-110 focus:scale-110 ${
            rating === currentRating ? 'rounded-lg bg-gray-300' : ''
          } sm:px-1`}
          alt={`Emoji ${rating}`}
          width={72}
          height={72}
        />
        <h5 className={`${color} py-2 text-center md:py-5`}>{rating}</h5>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center pb-10 pt-16 md:pt-24">
      <h1 className="sm:leading-2 text-md my-4 px-4 text-center font-semibold text-custom-4 sm:my-4 sm:px-8 md:my-8 md:px-16 md:text-3xl lg:my-10 lg:px-24">
        {surveyData?.title}
      </h1>
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
        {/* Group 1 */}
        <div className="flex flex-col md:mr-4">
          <h5 className="font mb-2 text-center text-custom-14 md:mb-4">
            Definitely
          </h5>
          <div className="flex gap-2 md:gap-3">
            {[10, 9].map(val => (
              <RenderEmoji
                key={'emoji' + val}
                rating={val}
                src={`/${val}.svg`}
                color="text-custom-14"
              />
            ))}
          </div>
        </div>

        {/* Group 2 */}
        <div className="flex flex-col md:mx-4">
          <h5 className="font mb-2 text-center text-custom-15 md:mb-4">
            Maybe
          </h5>
          <div className="flex gap-2 md:gap-3">
            {[8, 7].map(val => (
              <RenderEmoji
                key={'emoji' + val}
                rating={val}
                src={`/${val}.svg`}
                color="text-custom-15"
              />
            ))}
          </div>
        </div>

        {/* Group 3 */}
        <div className="flex flex-col md:ml-4">
          <h5 className="font mb-2 text-center text-custom-16 md:mb-4">
            Not at all
          </h5>
          <div className="flex flex-wrap justify-center gap-1 md:flex-nowrap md:gap-3">
            {[6, 5, 4, 3, 2, 1].map(val => (
              <RenderEmoji
                key={'emoji' + val}
                rating={val}
                src={`/${val}.svg`}
                color="text-custom-16"
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        color="blue"
        pill
        className="mt-2 w-40"
        disabled={submitDisabled}
        onClick={() => onSubmit(currentRating)}
      >
        Next
      </Button>
    </div>
  );
}
