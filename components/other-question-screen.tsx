"use client";
import { useState } from "react";
import { Button } from "flowbite-react";
import StarRating from "./star-rating";
import Radio from "./radio";
import Select from "./select";

export default function OtherQuestionPage(props: {
  questions: any;
  onSubmit: any;
  setOtherQuestions: any
}) {

  const { questions, onSubmit, setOtherQuestions } = props;
  console.log("In other", questions);
  const onStarRatingChange = (val:any, id: any) => {
    let newObj = questions.map((item: any) => item.id===id ? {...item, answer: [val]}: item)
    setOtherQuestions(newObj);
  };

  const onSingleSelectChange = (inx: any, maxSelect: any, id: any) => {
    // console.log("In single select", inx, maxSelect );
    setOtherQuestions(questions.map((item: any) => item.id===id ? {...item, answer: [inx]}: item))
  };

  const onMultiSelectChange = (inx: any, maxSelect: any, item: any) => {
    // console.log("In multipe sleect", inx, maxSelect);
    if(!item.answer){
        item.answer = [inx]
    }
    else if(item.answer?.length < maxSelect){
        if(!item.answer.includes(inx)){
            item.answer = [...item.answer, inx]
        }else {
            item.answer = item.answer.filter((val: any) => val !== inx);
        }
    }else{
        item.answer = [...item?.answer.slice(1), inx]
    }
    setOtherQuestions(questions.map((question : any) => question.id === item.id ? {...question, answer: item.answer} : question));
  };

  const onRadioChange = (radioId: any, id: any) => {
    // console.log("In radio select", radioId);
    setOtherQuestions(questions.map((item: any) => item.id === id ? {...item, answer: [radioId]} : item))
  };

  const renderQuestion = (item: any, val: any) => {
    switch (item.optionTypeName) {
      case "Star Rating": {
        return (
          <div className="flex flex-col gap-2 mb-10" key={val}>
            <h1>{`${val}) ${item.title}`}</h1>
            <StarRating
              starCount={5}
              rating={item.answer ? item.answer : 0}
              onChange={(val) => onStarRatingChange(val, item.id)}
            />
          </div>
        );
      }
      case "Multiple choice - Single Select": {
        return (
          <div className="flex flex-col gap-2 w-96 mb-10" key={val}>
            <h1>{`${val}) ${item.title}`}</h1>
            <Select
              options={item?.optionsJson?.options}
              selectedOptions={item.answer ? item.answer : null}
              maxSelect={1}
              onChange={(inx, maxSelect) => onSingleSelectChange(inx, maxSelect, item.id)}
            />
          </div>
        );
      }

      case "Multiple choice - multi select": {
        return (
          <div className="flex flex-col gap-2 w-96 mb-10" key={val}>
           <h1>{`${val}) ${item.title}`}</h1>
            <Select
              options={item?.optionsJson?.options}
              maxSelect={2}
              onChange={(inx, maxSelect) => onMultiSelectChange(inx, maxSelect, item)}
              selectedOptions={item.answer ? item.answer : []}
            />
          </div>
        );
      }

      case "Radio button": {
        return (
          <div className="flex flex-col gap-2 w-96 mb-10" key={val}>
           <h1>{`${val}) ${item.title}`}</h1>
            <Radio
              options={item?.optionsJson?.options}
              onChange={(radioId) => onRadioChange(radioId, item.id)}
              checkedId={item?.answer ? item?.answer[0] : null}
            />
          </div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-8 pt-32">
      <div className="flex flex-col items-center">
        {questions.map((item: any, key: any) => renderQuestion(item, key+1))}
      </div>
      <Button color="blue" pill style={{ width: 100, marginTop: 50 }}
        onClick={onSubmit}>
        Next
      </Button>
    </div>
  );
}
