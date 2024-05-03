import { templateQuestionsAtom } from '@/store/atom';
import { ILinkDetails, IOptions, ITemplateQuestion } from '@/types';
import { Button, FloatingLabel, Modal } from 'flowbite-react';
import { useAtom } from 'jotai';
import truncate from 'lodash.truncate';
import { File, Link, Plus, Trash2 } from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Radio from './radio';
import TemplateQuestionModal from './template-question-modal';

export default memo(function TemplateModal({
  showModal,
  createTemplateLoading,
  isTemplateEdit,
  setShowModal,
  setShowTemplateCreateModal,
  resetForCreateTemplate,
  onClickCreateOrUpdate,
}: {
  showModal: boolean;
  isTemplateEdit: boolean;
  createTemplateLoading: boolean;
  onClickCreateOrUpdate: () => void;
  setShowModal: (value: boolean) => void;
  setShowTemplateCreateModal: (value: boolean) => void;
  resetForCreateTemplate: () => void;
}) {
  const questionTypeOptions: IOptions[] = useMemo(
    () => [
      {
        id: 1,
        name: 'NPS Rating',
      },
      {
        id: 2,
        name: 'Star Rating',
      },
      {
        id: 3,
        name: 'Multiple choice - Single Select',
      },
      {
        id: 4,
        name: 'Multiple choice - multi select',
      },
      {
        id: 5,
        name: 'Radio button',
      },
      {
        id: 6,
        name: 'Text Area',
      },
    ],
    [],
  );
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionId, setQuestionId] = useState<number>();
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [selectQuestionType, setSelectQuestionType] = useState<string | number>(
    0,
  );
  const [selectedOptionPos, setSelectedOptionPos] = useState('');
  const [options, setOptions] = useState<IOptions[]>([]);
  const [tempOptions, setTempOptions] = useState<IOptions[]>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
  const [isAdded, setIsAdded] = useState(false);
  const [ratingRange, setRatingRange] = useState<number | string>('range_5');
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [linkDetails, setLinkDetails] = useState<ILinkDetails>();
  const [isAddQuestion, setIsAddQuestion] = useState(false);

  const [templateQuestion, setTemplateQuestion] = useAtom(
    templateQuestionsAtom,
  );

  const onChangeOptions = useCallback(
    (id: string | number, value: string) => {
      const arr = [...options];
      const index = arr.findIndex(val => val.id === id);
      arr[index].name = value;
      setOptions(arr);
    },
    [options, setOptions],
  );

  const onClickDeleteOption = useCallback(
    (id: string | number) => {
      if (options.length > 1) {
        const arr = [...options];
        const index = arr.findIndex(val => val.id === id);
        arr.splice(index, 1);
        setOptions(arr);
      }
    },
    [options, setOptions],
  );

  const onClickAddOptions = useCallback(() => {
    const id = options[options.length - 1].id;
    const emptyOptions: IOptions = {
      id: +id + 1,
      name: '',
    };
    setOptions([...options, emptyOptions]);
  }, [options]);

  const validation = useMemo(() => {
    if (!questionTitle || !questionDescription) return false;
    if (
      selectQuestionType === 1 ||
      selectQuestionType === 2 ||
      selectQuestionType === 6
    )
      return true;
    if (+selectQuestionType > 2) {
      if (!selectedOptionPos) return false;
      if (options.length && options.length > 1) {
        return options.every(val => val.name.length > 1);
      }
    }
    return false;
  }, [
    options,
    questionDescription,
    questionTitle,
    selectQuestionType,
    selectedOptionPos,
    // templateQuestion.length,
  ]);

  const hideNPS = useMemo(() => {
    if (templateQuestion.length === 1) return false;
    const npsIndex = templateQuestion.findIndex(val => val.optionTypeId === 1);
    if (npsIndex === -1) return false;
    return npsIndex !== 1 && npsIndex + 1 !== selectedQuestionIndex;
  }, [templateQuestion, selectedQuestionIndex]);

  const getOptions = useCallback((): IOptions[] => {
    const length =
      ratingRange === 'range_5' && selectQuestionType === 2 ? 5 : 10;
    let arr: IOptions[] = [];
    if (
      (selectQuestionType === 1 || selectQuestionType === 2) &&
      (!options.length || isAddQuestion)
    ) {
      arr = new Array(length).fill(null).map((_, inx) => ({
        id: inx + 1,
        name: `${inx + 1}`,
        linkedTo: undefined,
      }));
    } else {
      arr = options;
    }
    return arr;
  }, [isAddQuestion, options, ratingRange, selectQuestionType]);

  const resetOptionValues = useCallback(() => {
    setSelectedOptionPos('');
    setOptions(getOptions());
  }, [getOptions]);

  const resetAll = useCallback(() => {
    setQuestionTitle('');
    setQuestionId(undefined);
    setQuestionDescription('');
    setSelectQuestionType('');
    resetOptionValues();
  }, [
    resetOptionValues,
    setQuestionTitle,
    setQuestionId,
    setQuestionDescription,
    setSelectQuestionType,
  ]);

  const addEmptyQuestion = useCallback(() => {
    resetAll();
    const tempQuestion: ITemplateQuestion = {
      title: '',
      description: '',
      optionTypeId: '',
      optionTypeName: '',
    };
    setShowQuestion(true);
    setIsAddQuestion(true);
    setSelectedQuestionIndex(templateQuestion.length + 1);
    let arr = [];
    if (!templateQuestion.length) {
      arr.push(tempQuestion);
    } else {
      arr = [...templateQuestion, tempQuestion];
    }
    setTemplateQuestion(arr);
  }, [resetAll, templateQuestion, setTemplateQuestion]);

  const onClickCreateQuestion = useCallback(() => {
    const lastQuestionId =
      templateQuestion[templateQuestion.length - 2]?.questionId;
    const tempQuestion: ITemplateQuestion = {
      questionId: isAdded
        ? +(selectedQuestionIndex || '1')
        : lastQuestionId
          ? lastQuestionId + 1
          : 1,
      title: questionTitle,
      description: questionDescription,
      optionTypeId: selectQuestionType,
      optionTypeName: questionTypeOptions.find(
        val => val.id === selectQuestionType,
      )?.name,
      isAdded: true,
      optionsJson: {
        optionPosition: selectedOptionPos,
        options: getOptions(),
      },
    };
    if (isAdded && selectedQuestionIndex) {
      const arr = [...templateQuestion];
      arr[selectedQuestionIndex - 1] = tempQuestion;
      setTemplateQuestion(arr);
    } else {
      if (templateQuestion.length) {
        setTemplateQuestion([
          ...templateQuestion.filter(val => val.title),
          tempQuestion,
        ]);
      } else {
        setTemplateQuestion([tempQuestion]);
      }
    }
    resetAll();
    setShowQuestion(false);
  }, [
    questionTitle,
    questionDescription,
    selectQuestionType,
    questionTypeOptions,
    selectedOptionPos,
    getOptions,
    isAdded,
    selectedQuestionIndex,
    resetAll,
    templateQuestion,
    setTemplateQuestion,
  ]);

  const onLinkUpdateOptions = useCallback(() => {
    if (selectedQuestionIndex) {
      const arr = [...templateQuestion];
      arr[selectedQuestionIndex - 1] = {
        ...arr[selectedQuestionIndex - 1],
        optionsJson: {
          optionPosition: selectedOptionPos,
          options: getOptions(),
        },
      };
      setTemplateQuestion(arr);
    }
  }, [
    getOptions,
    selectedOptionPos,
    selectedQuestionIndex,
    setTemplateQuestion,
    templateQuestion,
  ]);

  const handleSelectQuestion = useCallback(
    (inx: number) => {
      const curQuestion: ITemplateQuestion = templateQuestion?.[inx];
      setShowQuestion(true);
      setIsAddQuestion(false);
      setQuestionId(curQuestion?.questionId);
      setQuestionTitle(curQuestion?.title);
      setQuestionDescription(curQuestion?.description);
      setSelectQuestionType(curQuestion?.optionTypeId);
      setSelectedOptionPos(curQuestion?.optionsJson?.optionPosition || '');
      setOptions(curQuestion?.optionsJson?.options || []);
      setSelectedQuestionIndex(inx + 1);
      setIsAdded(curQuestion?.isAdded || false);
    },
    [templateQuestion, setShowQuestion],
  );

  const addQuestionValidation = useMemo(() => {
    if (!templateQuestion.length && !showQuestion) return true;
    return templateQuestion.length && templateQuestion.every(val => val.title);
  }, [showQuestion, templateQuestion]);

  const onClickDeleteTemplateQuestion = useCallback(
    (inx: number) => {
      resetAll();
      setShowQuestion(false);
      setQuestionId(undefined);
      setQuestionTitle('');
      setTemplateQuestion(data => data.filter((_, index) => index !== inx));
    },
    [resetAll, setTemplateQuestion],
  );

  const validateCreateTemplate = useMemo(() => {
    if (templateQuestion.length < 2) return true;
    return !addQuestionValidation;
  }, [addQuestionValidation, templateQuestion]);

  const dragQuestion = useRef<number>(0);
  const draggedOverQuestion = useRef<number>(0);

  const handleSort = useCallback(() => {
    let clone = [...templateQuestion];
    const tempDraggedQuestion = clone[dragQuestion.current];
    const tempDraggedOverQuestion = clone[draggedOverQuestion.current];
    clone[dragQuestion.current] = clone[draggedOverQuestion.current];
    clone[draggedOverQuestion.current] = tempDraggedQuestion;
    clone = clone.map((val, inx) => ({ ...val, questionId: inx + 1 }));
    clone = clone.map(val1 => {
      const options = val1.optionsJson?.options.map(val2 => {
        if (val2.linkedTo === tempDraggedQuestion.questionId) {
          return {
            ...val2,
            linkedTo: tempDraggedOverQuestion.questionId,
          };
        } else if (val2.linkedTo === tempDraggedOverQuestion.questionId) {
          return {
            ...val2,
            linkedTo: tempDraggedQuestion.questionId,
          };
        } else {
          return val2;
        }
      });
      return {
        ...val1,
        optionsJson: {
          ...val1.optionsJson,
          options,
        },
      };
    }) as ITemplateQuestion[];
    setTemplateQuestion(clone);
    const toBeUpdatedOptions = clone.find(val => val.questionId === questionId);
    setOptions(toBeUpdatedOptions?.optionsJson?.options as IOptions[]);
  }, [questionId, setTemplateQuestion, templateQuestion]);

  const handleLinkQuestion = useCallback(
    (questionId: number, optionId: number) => {
      setShowQuestionModal(true);
      setLinkDetails({
        questionId,
        optionId,
      });
    },
    [],
  );

  useEffect(() => {
    if (selectQuestionType === 1) {
      setRatingRange('range_10');
    }
  }, [selectQuestionType]);

  useEffect(() => {
    if (selectedQuestionIndex) {
      const curQuestion = templateQuestion[selectedQuestionIndex - 1];
      const length = ratingRange === 'range_5' ? 5 : 10;
      if (!curQuestion?.isAdded || !curQuestion?.optionsJson?.options?.length) {
        if (selectQuestionType === 1 || selectQuestionType === 2) {
          const arr = new Array(length).fill(null).map((_, inx) => ({
            id: inx + 1,
            name: `${inx + 1}`,
          }));
          setOptions(arr);
        } else {
          setSelectedOptionPos('y');
          setOptions([
            {
              id: 1,
              name: '',
            },
          ]);
        }
      } else {
        setTempOptions(curQuestion?.optionsJson?.options);
        if (selectQuestionType === 1 || selectQuestionType === 2) {
          const currentOptions = curQuestion?.optionsJson?.options;
          const arr = new Array(length).fill(null).map((_, inx) => ({
            id: inx + 1,
            name: `${inx + 1}`,
            linkedTo: currentOptions[inx]?.linkedTo || '',
          }));
          setOptions(arr);
        } else {
          const isRating = curQuestion?.optionsJson?.options[0]?.name === '1';
          if (tempOptions?.length && !isRating) {
            setOptions(tempOptions);
          } else {
            setOptions([
              {
                id: 1,
                name: '',
              },
            ]);
          }
        }
      }
    }
  }, [
    selectQuestionType,
    selectedQuestionIndex,
    ratingRange,
    templateQuestion,
    tempOptions,
  ]);

  return (
    <Modal
      show={showModal}
      size="5xl"
      onClose={() => {
        resetAll();
        resetForCreateTemplate();
        setShowModal(false);
        setShowTemplateCreateModal(false);
        setShowQuestion(false);
      }}
      popup
    >
      <Modal.Body className="overflow-hidden p-0">
        <Modal.Header className="relative border-b border-b-modalBorder">
          <span className="absolute left-[calc(50%-96px)]">
            {isTemplateEdit ? 'Update' : 'Build'}
            {' template'}
          </span>
        </Modal.Header>
        <div className="flex h-templateModal w-full p-0 ">
          <div className="flex w-modalLeftPanel flex-col gap-4 overflow-y-scroll border-r border-modalBorder p-6 pb-16 scrollbar-hide">
            {templateQuestion?.map(({ title }, inx) => {
              return (
                <div
                  className="flex cursor-grab flex-col"
                  key={'question-' + inx}
                  draggable
                  onClick={() => handleSelectQuestion(inx)}
                  onDragStart={() => (dragQuestion.current = inx)}
                  onDragEnter={() => (draggedOverQuestion.current = inx)}
                  onDragEnd={handleSort}
                  onDragOver={e => e.preventDefault()}
                >
                  <div
                    className={`flex w-full cursor-pointer rounded-md border border-l-4 border-l-navLeftBorder px-3 py-2 hover:bg-green-100
                  ${
                    (selectedQuestionIndex as number) - 1 === inx
                      ? 'bg-navBg'
                      : ''
                  }`}
                  >
                    <div className="flex w-full justify-between">
                      <div className="flex">
                        <p className="select-none text-sm font-normal text-radio">
                          {inx + 1}.{' '}
                          {truncate(title ? title : 'Draft', {
                            length: 40,
                          })}
                        </p>
                        {!title && <File className="ml-2 stroke-gray-300" />}
                      </div>
                      <Trash2
                        className="ml-2 stroke-txtPurple opacity-80"
                        onClick={e => {
                          e.stopPropagation();
                          onClickDeleteTemplateQuestion(inx);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={addEmptyQuestion}
              disabled={!addQuestionValidation}
            >
              <div className="flex items-center gap-1">
                Add a question{' '}
                <Plus
                  size={20}
                  color="#fff"
                />
              </div>
            </Button>
          </div>
          {showQuestion ? (
            <div className="flex w-modalRightPanel flex-col gap-6 overflow-y-scroll px-6 pb-16 pt-8 scrollbar-hide">
              <div className="flex w-full gap-2 ">
                <h1 className="text-md w-full border-b border-b-navBorder pb-2 font-semibold text-sidebarText">
                  Type question title & description
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex w-full items-center gap-4">
                  <h1 className="text-lg font-semibold text-txtBlack">
                    {selectedQuestionIndex
                      ? selectedQuestionIndex
                      : templateQuestion.length || 1}
                    .
                  </h1>
                  <FloatingLabel
                    variant="standard"
                    label="Start typing your question here..."
                    size={80}
                    onChange={e => setQuestionTitle(e.target.value)}
                    value={questionTitle}
                  />
                </div>
                <div className="flex w-full items-center gap-4">
                  <h1 className="cursor-default text-lg font-semibold text-txtBlack opacity-0">
                    1.
                  </h1>
                  <FloatingLabel
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
                  <h1 className="text-md border-b border-b-navBorder pb-2 font-semibold text-sidebarText">
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
                  <div className="flex justify-between border-b border-b-navBorder pb-2">
                    <h1 className="text-md font-semibold text-sidebarText">
                      Link Question
                    </h1>
                  </div>

                  {(selectQuestionType as number) === 2 &&
                  selectedQuestionIndex ? (
                    <div className="flex flex-col gap-2">
                      <p className="select-none text-sm font-normal text-radio">
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
                        key={'rating-button-' + index}
                        color="gray"
                        onClick={() =>
                          handleLinkQuestion(
                            selectedQuestionIndex as number,
                            +id,
                          )
                        }
                      >
                        {+id}
                        {linkedTo ? (
                          <div className="absolute -end-0 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
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
                  <h1 className="text-md border-b border-b-navBorder pb-2 font-semibold text-sidebarText">
                    Add Options
                  </h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <p className="text-md select-none font-normal text-radio">
                        Select option position
                      </p>
                      <Button.Group>
                        <Button
                          gradientDuoTone={
                            selectedOptionPos === 'x' ? 'purpleToBlue' : ''
                          }
                          color="gray"
                          onClick={() => setSelectedOptionPos('x')}
                        >
                          Horizontal
                        </Button>
                        <Button
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
                          id={`options-${id}` + inx}
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-4 ps-4 text-sm text-gray-900 outline-starStroke focus:border-blue-500 focus:ring-blue-500"
                          placeholder={`Type option ${inx + 1}`}
                          value={name ? name : ''}
                          required
                          onChange={e => onChangeOptions(id, e.target.value)}
                        />

                        {linkedTo ? (
                          <div className="absolute bottom-4 right-[calc(12%)] z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
                            {linkedTo}
                          </div>
                        ) : null}

                        {name.length > 1 ? (
                          <Link
                            className={`absolute bottom-4 right-10 z-10 ${
                              options.length > 1
                                ? 'cursor-pointer'
                                : 'cursor-not-allowed'
                            } stroke-txtPurple`}
                            onClick={() => {
                              onLinkUpdateOptions();
                              handleLinkQuestion(
                                selectedQuestionIndex as number,
                                +id,
                              );
                            }}
                          />
                        ) : null}

                        <Trash2
                          className={`absolute bottom-4 end-2.5 z-10 ${
                            options.length > 1
                              ? 'cursor-pointer'
                              : 'cursor-not-allowed'
                          } stroke-txtPurple`}
                          onClick={() => onClickDeleteOption(id)}
                        />
                      </div>
                    ))}
                    {(selectQuestionType as number) > 2 &&
                    options.length > 0 ? (
                      <Button
                        color="light"
                        className="text-sm font-semibold text-radio"
                        onClick={onClickAddOptions}
                      >
                        Add Option
                      </Button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {validation ? (
                <Button
                  gradientMonochrome="success"
                  pill
                  className="ml-8  text-white"
                  onClick={() => onClickCreateQuestion()}
                >
                  {isAdded && selectedQuestionIndex ? 'Update' : 'Create'}{' '}
                  question
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="m-auto flex flex-col justify-center">
              <h1 className="text-xl font-medium text-sidebarText">
                Click on add a question to continue...
              </h1>
            </div>
          )}
        </div>

        <TemplateQuestionModal
          showModal={showQuestionModal}
          setShowModal={setShowQuestionModal}
          linkDetails={linkDetails}
          questions={templateQuestion.filter(
            val => val.questionId !== linkDetails?.questionId,
          )}
        />
      </Modal.Body>
      <Modal.Footer className="relative flex h-footer items-center justify-between border-t border-t-modalBorder">
        <Button
          className="ml-auto"
          disabled={Boolean(validateCreateTemplate)}
          isProcessing={createTemplateLoading}
          onClick={onClickCreateOrUpdate}
        >
          {isTemplateEdit ? 'Update' : 'Create'}
          {''} template
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
