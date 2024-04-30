import { ILinkDetails, IOptions, ITemplateQuestion } from "@/types";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import { File, Link, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, memo, useRef } from "react";
import { useAtom } from "jotai";
import { templateQuestionsAtom } from "@/store/atom";
import Radio from "./radio";
import truncate from "lodash.truncate";
import TemplateQuestionModal from "./template-question-modal";

export default function TemplateModal({
  showModal,
  setShowModal,
  setShowTemplateCreateModal,
  createTemplateLoading,
  isTemplateEdit,
  resetForCreateTemplate,
  onClickCreateOrUpdate,
}: {
  showModal: boolean;
  isTemplateEdit: boolean;
  setShowModal: (value: boolean) => void;
  setShowTemplateCreateModal: (value: boolean) => void;
  createTemplateLoading: boolean;
  resetForCreateTemplate: () => void;
  onClickCreateOrUpdate: () => void;
}) {
  const questionTypeOptions: IOptions[] = useMemo(
    () => [
      {
        id: 1,
        name: "NPS Rating",
      },
      {
        id: 2,
        name: "Star Rating",
      },
      {
        id: 3,
        name: "Multiple choice - Single Select",
      },
      {
        id: 4,
        name: "Multiple choice - multi select",
      },
      {
        id: 5,
        name: "Radio button",
      },
      {
        id: 6,
        name: "Text Area",
      },
    ],
    []
  );
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionId, setQuestionId] = useState<number>();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [selectQuestionType, setSelectQuestionType] = useState<string | number>(
    0
  );
  const [selectedOptionPos, setSelectedOptionPos] = useState("");
  const [options, setOptions] = useState<IOptions[]>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
  const [isAdded, setIsAdded] = useState(false);
  const [ratingRange, setRatingRange] = useState<number | string>("range_5");
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [linkDetails, setLinkDetails] = useState<ILinkDetails>();
  const [isAddQuestion, setIsAddQuestion] = useState(false);

  const [templateQuestion, setTemplateQuestion] = useAtom(
    templateQuestionsAtom
  );

  const onChangeOptions = useCallback(
    (id: string | number, value: string) => {
      const arr = [...options];
      const index = arr.findIndex((val) => val.id === id);
      arr[index].name = value;
      setOptions(arr);
    },
    [options, setOptions]
  );

  const onClickDeleteOption = useCallback(
    (id: string | number) => {
      if (options.length > 1) {
        const arr = [...options];
        const index = arr.findIndex((val) => val.id === id);
        arr.splice(index, 1);
        setOptions(arr);
      }
    },
    [options, setOptions]
  );

  const onClickAddOptions = useCallback(() => {
    const id = options[options.length - 1].id;
    const emptyOptions: IOptions = {
      id: +id + 1,
      name: "",
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
        return options.every((val) => val.name.length > 1);
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
    const npsIndex = templateQuestion.findIndex(
      (val) => val.optionTypeId === 1
    );
    return npsIndex !== 1 && npsIndex + 1 !== selectedQuestionIndex;
  }, [templateQuestion, selectedQuestionIndex]);

  const getOptions = useCallback((): IOptions[] => {
    const length =
      ratingRange === "range_5" && selectQuestionType === 2 ? 5 : 10;
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
    setSelectedOptionPos("");
    setOptions(getOptions());
  }, [getOptions]);

  const resetAll = useCallback(() => {
    setQuestionTitle("");
    setQuestionId(undefined);
    setQuestionDescription("");
    setSelectQuestionType("");
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
      title: "",
      description: "",
      optionTypeId: "",
      optionTypeName: "",
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
      questionId: lastQuestionId ? lastQuestionId + 1 : 1,
      title: questionTitle,
      description: questionDescription,
      optionTypeId: selectQuestionType,
      optionTypeName: questionTypeOptions.find(
        (val) => val.id === selectQuestionType
      )?.name,
      isAdded: true,
      optionsJson: {
        optionPosition: selectedOptionPos,
        options: getOptions(),
      },
    };
    if (isAdded && selectedQuestionIndex) {
      let arr = [...templateQuestion];
      arr[selectedQuestionIndex - 1] = tempQuestion;
      setTemplateQuestion(arr);
    } else {
      if (templateQuestion.length) {
        setTemplateQuestion([
          ...templateQuestion.filter((val) => val.title),
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
      let arr = [...templateQuestion];
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
      setSelectedOptionPos(curQuestion?.optionsJson?.optionPosition || "");
      setOptions(curQuestion?.optionsJson?.options || []);
      setSelectedQuestionIndex(inx + 1);
      setIsAdded(curQuestion?.isAdded || false);
    },
    [templateQuestion, setShowQuestion]
  );

  const addQuestionValidation = useMemo(() => {
    if (!templateQuestion.length && !showQuestion) return true;
    return (
      templateQuestion.length && templateQuestion.every((val) => val.title)
    );
  }, [showQuestion, templateQuestion]);

  const onClickDeleteTemplateQuestion = useCallback(
    (inx: number) => {
      resetAll();
      setShowQuestion(false);
      setQuestionId(undefined);
      setQuestionTitle("");
      setTemplateQuestion((data) => data.filter((_, index) => index !== inx));
    },
    [resetAll, setTemplateQuestion]
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
    clone = clone.map((val1) => {
      const options = val1.optionsJson?.options.map((val2) => {
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
    const toBeUpdatedOptions = clone.find(
      (val) => val.questionId === questionId
    );
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
    []
  );

  useEffect(() => {
    if (selectQuestionType === 1) {
      setRatingRange("range_10");
    }
  }, [selectQuestionType]);

  useEffect(() => {
    if (selectedQuestionIndex) {
      const curQuestion = templateQuestion[selectedQuestionIndex - 1];
      if (!curQuestion?.isAdded || !curQuestion?.optionsJson?.options?.length) {
        if (selectQuestionType === 2) {
          const length = ratingRange === "range_5" ? 5 : 10;
          const arr = new Array(length).fill(null).map((_, inx) => ({
            id: inx + 1,
            name: `${inx + 1}`,
            linkedTo: undefined,
          }));
          setOptions(arr);
        } else {
          setSelectedOptionPos("y");
          setOptions([
            {
              id: 1,
              name: "",
            },
          ]);
        }
      }
    }
  }, [
    selectQuestionType,
    selectedQuestionIndex,
    ratingRange,
    templateQuestion,
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
      <Modal.Body className="p-0 overflow-hidden">
        <Modal.Header className="border-b border-b-modalBorder relative">
          <span className="absolute left-[calc(50%-96px)]">
            {isTemplateEdit ? "Update" : "Build"}
            {" template"}
          </span>
        </Modal.Header>
        <div className="p-0 flex h-templateModal w-full ">
          <div className="flex gap-4 flex-col w-modalLeftPanel border-r border-modalBorder p-6 overflow-y-scroll scrollbar-hide pb-16">
            {templateQuestion?.map(({ title }, inx) => {
              return (
                <div
                  className="flex flex-col cursor-grab"
                  key={"question-" + inx}
                  draggable
                  onClick={() => handleSelectQuestion(inx)}
                  onDragStart={() => (dragQuestion.current = inx)}
                  onDragEnter={() => (draggedOverQuestion.current = inx)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div
                    className={`flex w-full border px-3 py-2 rounded-md cursor-pointer border-l-4 hover:bg-green-100 border-l-navLeftBorder
                  ${
                    (selectedQuestionIndex as number) - 1 === inx
                      ? "bg-navBg"
                      : ""
                  }`}
                  >
                    <div className="flex w-full justify-between">
                      <div className="flex">
                        <p className="text-sm font-normal text-radio select-none">
                          {inx + 1}.{" "}
                          {truncate(title ? title : "Draft", {
                            length: 40,
                          })}
                        </p>
                        {!title && <File className="stroke-gray-300 ml-2" />}
                      </div>
                      <Trash2
                        className="stroke-txtPurple ml-2 opacity-80"
                        onClick={(e) => {
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
              <div className="flex gap-1 items-center">
                Add a question <Plus size={20} color="#fff" />
              </div>
            </Button>
          </div>
          {showQuestion ? (
            <div className="flex flex-col pt-8 pb-16 px-6 gap-6 w-modalRightPanel overflow-y-scroll scrollbar-hide">
              <div className="flex gap-2 w-full ">
                <h1 className="text-sidebarText text-md font-semibold border-b border-b-navBorder pb-2 w-full">
                  Type question title & description
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex w-full gap-4 items-center">
                  <h1 className="text-txtBlack text-lg font-semibold">
                    {selectedQuestionIndex
                      ? selectedQuestionIndex
                      : templateQuestion.length || 1}
                    .
                  </h1>
                  <FloatingLabel
                    variant="standard"
                    label="Start typing your question here..."
                    size={80}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    value={questionTitle}
                  />
                </div>
                <div className="w-full flex gap-4 items-center">
                  <h1 className="text-txtBlack text-lg font-semibold opacity-0 cursor-default">
                    1.
                  </h1>
                  <FloatingLabel
                    variant="standard"
                    size={82}
                    label="Add description to your question"
                    onChange={(e) => setQuestionDescription(e.target.value)}
                    value={questionDescription}
                  />
                </div>
              </div>
              {selectedQuestionIndex ? (
                !templateQuestion[selectedQuestionIndex - 1]?.isAdded ? (
                  <div className="flex flex-col gap-4 pl-8">
                    <h1 className="text-sidebarText text-md font-semibold border-b border-b-navBorder pb-2">
                      Select question type
                    </h1>
                    <Radio
                      options={questionTypeOptions.filter((val) =>
                        hideNPS ? val.id !== 1 : val
                      )}
                      onChange={(id) => {
                        setSelectQuestionType(id);
                      }}
                      checkedId={selectQuestionType}
                      stacked={false}
                      disabled={!hideNPS}
                    />
                  </div>
                ) : null
              ) : null}
              {((selectQuestionType as number) === 1 ||
                (selectQuestionType as number) === 2) &&
              templateQuestion.length > 1 ? (
                <div className="flex flex-col gap-6 pl-8">
                  <div className="flex justify-between border-b border-b-navBorder pb-2">
                    <h1 className="text-sidebarText text-md font-semibold">
                      Link Question
                    </h1>
                  </div>

                  {(selectQuestionType as number) === 2 &&
                  (selectedQuestionIndex
                    ? !templateQuestion[selectedQuestionIndex - 1]?.isAdded
                    : true) ? (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-normal text-radio select-none">
                        Select your range
                      </p>
                      <Radio
                        options={[
                          {
                            id: "range_5",
                            name: "1 - 5",
                          },
                          {
                            id: "range_10",
                            name: "1 - 10",
                          },
                        ]}
                        stacked={false}
                        checkedId={ratingRange}
                        onChange={(id) => setRatingRange(id)}
                      />
                    </div>
                  ) : null}

                  <Button.Group outline>
                    {options.map(({ id, linkedTo }, index) => (
                      <Button
                        key={"rating-button-" + index}
                        color="gray"
                        onClick={() =>
                          handleLinkQuestion(
                            selectedQuestionIndex as number,
                            +id
                          )
                        }
                      >
                        {+id}
                        {linkedTo ? (
                          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-0 dark:border-gray-900">
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
                  <h1 className="text-sidebarText text-md font-semibold border-b border-b-navBorder pb-2">
                    Add Options
                  </h1>
                  <div className="flex gap-4 items-center">
                    <p className="text-md font-normal text-radio select-none">
                      Select option position
                    </p>
                    <Button.Group>
                      <Button
                        gradientDuoTone={
                          selectedOptionPos === "x" ? "purpleToBlue" : ""
                        }
                        color="gray"
                        onClick={() => setSelectedOptionPos("x")}
                      >
                        Horizontal
                      </Button>
                      <Button
                        gradientDuoTone={
                          selectedOptionPos === "y" ? "purpleToBlue" : ""
                        }
                        color="gray"
                        onClick={() => setSelectedOptionPos("y")}
                      >
                        Vertical
                      </Button>
                    </Button.Group>
                  </div>

                  <div className="flex flex-col gap-4">
                    {options.map(({ name, id, linkedTo }, inx) => (
                      <div className="relative" key={`options-${id}` + inx}>
                        <input
                          id={`options-${id}` + inx}
                          className="block w-full px-2 py-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-starStroke"
                          placeholder={`Type option ${inx + 1}`}
                          value={name ? name : ""}
                          required
                          onChange={(e) => onChangeOptions(id, e.target.value)}
                        />

                        {linkedTo ? (
                          <div className="absolute right-[calc(12%)] bottom-4 z-10 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                            {linkedTo}
                          </div>
                        ) : null}

                        {name.length > 1 ? (
                          <Link
                            className={`absolute right-10 bottom-4 z-10 ${
                              options.length > 1
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            } stroke-txtPurple`}
                            onClick={() => {
                              onLinkUpdateOptions();
                              handleLinkQuestion(
                                selectedQuestionIndex as number,
                                +id
                              );
                            }}
                          />
                        ) : null}

                        <Trash2
                          className={`absolute end-2.5 bottom-4 z-10 ${
                            options.length > 1
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
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
                  {isAdded && selectedQuestionIndex ? "Update" : "Create"}{" "}
                  question
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col justify-center m-auto">
              <h1 className="text-sidebarText font-medium text-xl">
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
            (val) => val.questionId !== linkDetails?.questionId
          )}
        />
      </Modal.Body>
      <Modal.Footer className="border-t h-footer flex justify-between items-center border-t-modalBorder relative">
        <Button
          className="ml-auto"
          disabled={Boolean(validateCreateTemplate)}
          isProcessing={createTemplateLoading}
          onClick={onClickCreateOrUpdate}
        >
          {isTemplateEdit ? "Update" : "Create"}
          {""} template
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
