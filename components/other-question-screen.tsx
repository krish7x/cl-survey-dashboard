"use client";
import { useState } from "react";
import { Button } from "flowbite-react";
import StarRating from "./star-rating";
import Radio from "./radio";
import Select from "./select";

export default function OtherQuestionPage(props: {
  questions: any;
  onSubmit: any;
}) {
  const { questions, onSubmit } = props;

  const onStarRatingChange = () => {};

  const onSingleSelectChange = () => {};

  const onMultiSelectChange = () => {};

  const onRadioChange = () => {};

  const renderQuestion = (item: any) => {
    switch (item.optionTypeName) {
      case "Star Rating": {
        return (
          <div className="flex flex-col gap-2 mb-10">
            <h1>{item.title}</h1>
            <StarRating
              starCount={5}
              rating={item.rating ? item.rating : 0}
              onChange={onStarRatingChange}
            />
          </div>
        );
      }
      case "Multiple choice - Single Select": {
        return (
          <div className="flex flex-col gap-2 w-96 mb-10">
            <h1>{item.title}</h1>
            <Select
              options={item?.optionsJson?.options}
              selectedOptions={item.selectedOption ? item.selectedOption : null}
              maxSelect={1}
              onChange={onSingleSelectChange}
            />
          </div>
        );
      }

      case "Multiple choice - multi select": {
        return (
          <div className="flex flex-col gap-2 w-96">
            <h1>{item.title}</h1>
            <Select
              options={item?.optionsJson?.options}
              maxSelect={2}
              onChange={onMultiSelectChange}
              selectedOptions={item.selectedOptions ? item.selectedOptions : []}
            />
          </div>
        );
      }

      case "radiobutton": {
        return (
          <div className="flex flex-col gap-2 w-96">
            <h1>{item.title}</h1>
            <Radio
              options={item?.optionsJson?.options}
              onChange={onRadioChange}
              checkedId={item?.selectedOption ? item?.selectedOption : null}
            />
          </div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div className="flex flex-col items-center">
        {questions.map((item: any) => renderQuestion(item))}
      </div>
      <Button color="blue" pill style={{ width: 100, marginTop: 50 }}>
        Next
      </Button>
    </div>
  );
}
