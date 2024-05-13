import { questionTypeOptions } from '@/constants/questionTypes';
import { templateQuestionsAtom } from '@/store/atom';
import { ITemplateRightPanel } from '@/types/props/template-right-panel';
import { Button, FloatingLabel } from 'flowbite-react';
import { useAtom } from 'jotai';
import { Link, Trash2 } from 'lucide-react';
import { memo } from 'react';

import Radio from '../micros/radio';

export default memo(function TemplateModalRightPanel({
  showQuestion,
  selectedQuestionIndex,
  questionTitle,
  questionDescription,
  hideNPS,
  selectQuestionType,
  ratingRange,
  options,
  selectedOptionPos,
  validation,
  isAdded,
  setQuestionTitle,
  setQuestionDescription,
  setSelectQuestionType,
  setRatingRange,
  setSelectedOptionPos,
  setOptions,
  handleLinkQuestion,
  onChangeOptions,
  onLinkUpdateOptions,
  onClickDeleteOption,
  onClickAddOptions,
  onClickCreateQuestion,
}: ITemplateRightPanel) {
  const [templateQuestion] = useAtom(templateQuestionsAtom);
  return (
    <>
      {showQuestion ? (
        <div className="flex w-modal-right flex-col gap-6 overflow-y-scroll px-6 pb-16 pt-8 scrollbar-hide">
          <div className="flex w-full gap-2 ">
            <h1 className="text-md w-full border-b border-b-custom-5 pb-2 font-semibold text-custom-6">
              Type question title & description
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center gap-4">
              <h1 className="text-lg font-semibold text-custom-4">
                {selectedQuestionIndex
                  ? selectedQuestionIndex
                  : templateQuestion.length || 1}
                .
              </h1>
              <FloatingLabel
                id="txt-template-title"
                variant="standard"
                label="Start typing your question here..."
                size={80}
                onChange={e => setQuestionTitle(e.target.value)}
                value={questionTitle}
              />
            </div>
            <div className="flex w-full items-center gap-4">
              <h1 className="cursor-default text-lg font-semibold text-custom-4 opacity-0">
                1.
              </h1>
              <FloatingLabel
                id="txt-template-description"
                variant="standard"
                size={82}
                label="Add description to your question"
                onChange={e => setQuestionDescription(e.target.value)}
                value={questionDescription}
              />
            </div>
          </div>
          {selectedQuestionIndex ? (
            <div className="flex flex-col gap-4 pl-8">
              <h1 className="text-md border-b border-b-custom-5 pb-2 font-semibold text-custom-6">
                Select question type
              </h1>
              <Radio
                options={questionTypeOptions}
                onChange={id => {
                  setSelectQuestionType(id);
                }}
                checkedId={selectQuestionType}
                stacked={false}
                disabled={hideNPS}
                disabledId={hideNPS ? 1 : undefined}
              />
            </div>
          ) : null}
          {((selectQuestionType as number) === 1 ||
            (selectQuestionType as number) === 2) &&
          templateQuestion.length > 1 ? (
            <div className="flex flex-col gap-4 pl-8">
              <div className="flex justify-between border-b border-b-custom-5 pb-2">
                <h1 className="text-md font-semibold text-custom-6">
                  Link Question
                </h1>
              </div>

              {(selectQuestionType as number) === 2 && selectedQuestionIndex ? (
                <div className="flex flex-col gap-2">
                  <p className="select-none text-sm font-normal text-custom-13">
                    Select your range
                  </p>
                  <Radio
                    options={[
                      {
                        id: 'range_5',
                        name: '1 - 5',
                      },
                      {
                        id: 'range_10',
                        name: '1 - 10',
                      },
                    ]}
                    stacked={false}
                    checkedId={ratingRange}
                    onChange={id => setRatingRange(id)}
                  />
                </div>
              ) : null}

              <Button.Group outline>
                {options.map(({ id, linkedTo }, index) => (
                  <Button
                    id={'btn-range-' + index}
                    key={'rating-button-' + index}
                    color="gray"
                    onClick={() =>
                      handleLinkQuestion(selectedQuestionIndex as number, +id)
                    }
                  >
                    {+id}
                    {linkedTo ? (
                      <div
                        id={'linked-range-' + index}
                        className="absolute -end-0 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900"
                      >
                        {linkedTo}
                      </div>
                    ) : null}
                  </Button>
                ))}
              </Button.Group>
            </div>
          ) : null}

          {(selectQuestionType as number) > 2 &&
          (selectQuestionType as number) !== 6 ? (
            <div className="flex flex-col gap-6 pl-8">
              <h1 className="text-md border-b border-b-custom-5 pb-2 font-semibold text-custom-6">
                Add Options
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-md select-none font-normal text-custom-13">
                    Select option position
                  </p>
                  <Button.Group>
                    <Button
                      id="btn-template-x"
                      gradientDuoTone={
                        selectedOptionPos === 'x' ? 'purpleToBlue' : ''
                      }
                      color="gray"
                      onClick={() => setSelectedOptionPos('x')}
                    >
                      Horizontal
                    </Button>
                    <Button
                      id="btn-template-y"
                      gradientDuoTone={
                        selectedOptionPos === 'y' ? 'purpleToBlue' : ''
                      }
                      color="gray"
                      onClick={() => setSelectedOptionPos('y')}
                    >
                      Vertical
                    </Button>
                  </Button.Group>
                </div>
                <Button
                  id="btn-template-reset"
                  color="failure"
                  className="opacity-80"
                  onClick={() =>
                    setOptions([
                      {
                        id: 1,
                        name: '',
                      },
                    ])
                  }
                >
                  Reset
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                {options.map(({ name, id, linkedTo }, inx) => (
                  <div
                    className="relative"
                    key={`options-${id}` + inx}
                  >
                    <input
                      id={`txt-template-option-` + inx}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-4 ps-4 text-sm text-gray-900 outline-custom-12 focus:border-blue-500 focus:ring-blue-500"
                      placeholder={`Type option ${inx + 1}`}
                      value={name ? name : ''}
                      required
                      onChange={e => onChangeOptions(id, e.target.value)}
                    />

                    <div
                      id={`btn-option-link-` + inx}
                      className={`flex ${linkedTo ? 'bottom-2 bg-custom-21' : 'bottom-[calc(10px)] bg-custom-19'} absolute right-12  z-10 items-center gap-2 rounded-lg border border-custom-20 p-[calc(6px)] ${
                        options.length > 1
                          ? 'cursor-pointer'
                          : 'cursor-not-allowed'
                      }`}
                      onClick={() => {
                        onLinkUpdateOptions();
                        handleLinkQuestion(
                          selectedQuestionIndex as number,
                          +id,
                        );
                      }}
                    >
                      {linkedTo ? (
                        <p className="text-custom-19">
                          {linkedTo}
                          {+linkedTo < 10 ? (
                            <span className="invisible text-custom-19">0</span>
                          ) : null}
                        </p>
                      ) : null}
                      <Link
                        className={`h-5 w-5 ${linkedTo ? 'stroke-custom-19' : 'stroke-white'}`}
                      />
                    </div>

                    <Trash2
                      id={`btn-option-delete-` + inx}
                      className={`absolute bottom-4 end-2.5 z-10 ${
                        options.length > 1
                          ? 'cursor-pointer'
                          : 'cursor-not-allowed'
                      } stroke-custom-3`}
                      onClick={() => onClickDeleteOption(id)}
                    />
                  </div>
                ))}
                {(selectQuestionType as number) > 2 && options.length > 0 ? (
                  <Button
                    id="btn-add-option"
                    color="light"
                    className="text-sm font-semibold text-custom-13"
                    onClick={onClickAddOptions}
                  >
                    Add Option
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}

          <Button
            id="btn-update-question"
            gradientMonochrome="success"
            pill
            className="ml-8  text-white"
            disabled={!validation}
            onClick={() => onClickCreateQuestion()}
          >
            {isAdded && selectedQuestionIndex ? 'Update' : 'Create'} question
          </Button>
        </div>
      ) : (
        <div className="m-auto flex flex-col justify-center">
          <h1 className="text-xl font-medium text-custom-6">
            Click on add a question to continue...
          </h1>
        </div>
      )}
    </>
  );
});
