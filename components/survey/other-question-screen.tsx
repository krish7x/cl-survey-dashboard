'use client';

import { IOptions, ITemplateQuestion } from '@/types';
import { Button } from 'flowbite-react';

import Radio from '../micros/radio';
import Select from '../micros/select';
import StarRating from '../micros/star-rating';

export default function OtherQuestionPage(props: {
  questions: ITemplateQuestion[];
  onSubmit: () => void;
  setOtherQuestions: (value: ITemplateQuestion[]) => void;
}) {
  const { questions, onSubmit, setOtherQuestions } = props;
  const onStarRatingChange = (val: number, id?: number) => {
    const newObj = questions.map(item =>
      item.questionId === id ? { ...item, answer: [val] } : item,
    );
    setOtherQuestions(newObj);
  };

  const onSingleSelectChange = (inx: number, id?: number) => {
    setOtherQuestions(
      questions.map(item =>
        item.questionId === id ? { ...item, answer: [inx] } : item,
      ),
    );
  };

  const onMultiSelectChange = (
    inx: number,
    maxSelect: number,
    item: ITemplateQuestion,
  ) => {
    const answer = item.answer as number[];
    if (!item.answer) {
      item.answer = [inx];
    } else if (answer?.length < maxSelect) {
      if (!answer.includes(inx)) {
        item.answer = [...answer, inx];
      } else {
        item.answer = answer.filter(val => val !== inx);
      }
    } else {
      item.answer = [...answer.slice(1), inx];
    }
    setOtherQuestions(
      questions.map(question =>
        question.questionId === item.questionId
          ? { ...question, answer: item.answer }
          : question,
      ),
    );
  };

  const onRadioChange = (radioId: number, id?: number) => {
    setOtherQuestions(
      questions.map(item =>
        item.questionId === id ? { ...item, answer: [radioId] } : item,
      ),
    );
  };

  const renderQuestion = (item: ITemplateQuestion, val: number) => {
    switch (item.optionTypeName) {
      case 'Star Rating': {
        return (
          <div
            className="flex w-full flex-col gap-4 leading-6 md:w-1/3 md:gap-6"
            key={val}
          >
            <h1 className="leading-6 md:leading-7">{`${val}) ${item.title}`}</h1>
            <StarRating
              starCount={5}
              rating={item.answer ? item.answer?.[0] : 0}
              onChange={val => onStarRatingChange(val, item?.questionId)}
            />
          </div>
        );
      }
      case 'Multiple choice - Single Select': {
        return (
          <div
            className="flex w-full  flex-col gap-4 md:w-1/3 md:gap-6"
            key={val}
          >
            <h1 className="leading-6 md:leading-7">{`${val}) ${item.title}`}</h1>
            <Select
              options={item?.optionsJson?.options as IOptions[]}
              selectedOptions={item.answer ? (item.answer as number[]) : []}
              maxSelect={1}
              onChange={inx =>
                onSingleSelectChange(inx as number, item.questionId)
              }
            />
          </div>
        );
      }

      case 'Multiple choice - multi select': {
        return (
          <div
            className="flex w-full flex-col gap-4 leading-6 md:w-1/3 md:gap-6"
            key={val}
          >
            <h1 className="leading-6 md:leading-7">{`${val}) ${item.title}`}</h1>
            <Select
              options={item?.optionsJson?.options as IOptions[]}
              maxSelect={2}
              onChange={(inx, maxSelect) =>
                onMultiSelectChange(inx as number, maxSelect, item)
              }
              selectedOptions={item.answer ? (item.answer as number[]) : []}
            />
          </div>
        );
      }

      case 'Radio button': {
        return (
          <div
            className="flex w-full flex-col gap-4 leading-6 md:w-1/3 md:gap-6"
            key={val}
          >
            <h1 className="leading-6 md:leading-7">{`${val}) ${item.title}`}</h1>
            <Radio
              options={item?.optionsJson?.options as IOptions[]}
              onChange={radioId =>
                onRadioChange(radioId as number, item.questionId)
              }
              checkedId={item?.answer ? item?.answer?.[0] : ''}
              stacked={item?.optionsJson?.optionPosition === 'y'}
            />
          </div>
        );
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-6 px-6 pb-8 pt-20 md:pt-28">
      <div className="flex w-full flex-col items-center gap-7 md:gap-10">
        {questions?.map((item: ITemplateQuestion, key) =>
          renderQuestion(item, key + 1),
        )}
      </div>
      <Button
        color="blue"
        size={'xl'}
        pill
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  );
}
