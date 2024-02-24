import { IOptions, ITemplateQuestion } from "@/types";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import { File, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { useAtom } from "jotai";
import { templateQuestionsAtom } from "@/store/atom";
import Radio from "./radio";
import truncate from "lodash.truncate";

export default memo(function TemplateModal({
  showModal,
  setShowModal,
  setShowCreateModal,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setShowCreateModal: (value: boolean) => void;
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
    ],
    []
  );
  const [createClicked, setCreateClicked] = useState(true);
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

  const [templateQuestion, setTemplateQuestion] = useAtom(
    templateQuestionsAtom
  );

  useEffect(() => {
    if (
      selectedOptionPos &&
      !options.length &&
      (selectedOptionPos === "x" || selectedOptionPos === "y")
    ) {
      const options: IOptions = {
        id: 1,
        name: "",
      };
      setOptions([options]);
    }
  }, [options.length, selectedOptionPos]);

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
    if (selectQuestionType === 1 || selectQuestionType === 2) return true;
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
  ]);

  const resetOptionValues = useCallback(() => {
    setSelectedOptionPos("");
    setOptions([]);
  }, []);

  const resetAll = useCallback(() => {
    setQuestionTitle("");
    setQuestionDescription("");
    setSelectQuestionType("");
    resetOptionValues();
    setCreateClicked(false);
  }, [resetOptionValues, setQuestionTitle, setQuestionDescription]);

  const addEmptyQuestion = useCallback(() => {
    const tempQuestion: ITemplateQuestion = {
      title: "",
      description: "",
      optionTypeId: "",
      optionTypeName: "",
    };
    resetAll();
    setCreateClicked(true);
    setSelectedQuestionIndex(null);
    let arr = [];
    if (!templateQuestion.length) {
      arr.push(tempQuestion);
    } else {
      arr = [...templateQuestion, tempQuestion];
    }
    setTemplateQuestion(arr);
  }, [resetAll, setTemplateQuestion, templateQuestion]);

  const onClickCreateQuestion = useCallback(() => {
    const tempQuestion: ITemplateQuestion = {
      title: questionTitle,
      description: questionDescription,
      optionTypeId: selectQuestionType,
      optionTypeName: questionTypeOptions.find(
        (val) => val.id === selectQuestionType
      )?.name,
      isAdded: true,
    };
    if (isAdded && selectedQuestionIndex) {
      let arr = [...templateQuestion];
      arr[selectedQuestionIndex - 1] = tempQuestion;
      setTemplateQuestion(arr);
    } else {
      if (+selectQuestionType > 2) {
        tempQuestion.optionsJson = {
          optionPosition: selectedOptionPos,
          options,
        };
      }
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
  }, [
    options,
    questionDescription,
    questionTitle,
    questionTypeOptions,
    resetAll,
    selectQuestionType,
    selectedOptionPos,
    setTemplateQuestion,
    templateQuestion,
    isAdded,
    selectedQuestionIndex,
  ]);

  const handleSelectQuestion = useCallback(
    (inx: number) => {
      const curQuestion: ITemplateQuestion = templateQuestion?.[inx];
      setCreateClicked(true);
      setQuestionTitle(curQuestion?.title);
      setQuestionDescription(curQuestion?.description);
      setSelectQuestionType(curQuestion?.optionTypeId);
      setSelectedOptionPos(curQuestion?.optionsJson?.optionPosition || "");
      setOptions(curQuestion?.optionsJson?.options || []);
      setSelectedQuestionIndex(inx + 1);
      setIsAdded(curQuestion?.isAdded || false);
    },
    [templateQuestion]
  );

  const addQuestionValidation = useMemo(() => {
    if (!templateQuestion.length) return true;
    return (
      templateQuestion.length && templateQuestion.every((val) => val.title)
    );
  }, [templateQuestion]);

  const onClickDeleteTemplateQuestion = useCallback(
    (inx: number) => {
      resetAll();
      setCreateClicked(false);
      setQuestionTitle("");
      setTemplateQuestion((data) => data.filter((_, index) => index !== inx));
    },
    [resetAll, setTemplateQuestion]
  );

  const validateCreateTemplate = useMemo(() => {
    if (templateQuestion.length < 2) return false;
    return !addQuestionValidation;
  }, [addQuestionValidation, templateQuestion]);

  return (
    <Modal
      show={showModal}
      size="5xl"
      onClose={() => setShowModal(false)}
      popup
    >
      <Modal.Body className="p-0 overflow-hidden">
        <Modal.Header className="border-b border-b-modalBorder relative">
          <span className="absolute left-[calc(50%-96px)]">
            Build your template
          </span>
        </Modal.Header>
        <div className="p-0 flex h-templateModal w-full ">
          <div className="flex gap-4 flex-col w-modalLeftPanel border-r border-modalBorder p-6 overflow-y-scroll pb-16">
            {templateQuestion?.map(({ title }, inx) => {
              return (
                <div
                  className="flex flex-col"
                  key={"question-" + inx}
                  onClick={() => handleSelectQuestion(inx)}
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
                            length: 20,
                          })}
                        </p>
                        {!title && <File className="stroke-gray-300 ml-2" />}
                      </div>
                      <Trash2
                        className="stroke-txtBlack ml-2 opacity-80"
                        onClick={() => onClickDeleteTemplateQuestion(inx)}
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
          {createClicked && (
            <div className="flex flex-col pt-8 pb-16 px-6 gap-6 w-modalRightPanel overflow-y-scroll">
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
              <div className="flex flex-col gap-4 pl-8">
                <h1 className="text-sidebarText text-md font-semibold border-b border-b-navBorder pb-2">
                  Select question type
                </h1>
                <Radio
                  options={questionTypeOptions}
                  stacked={false}
                  onChange={(id) => {
                    setSelectQuestionType(id);
                    if (id === 1 || id === 2) resetOptionValues();
                  }}
                  checkedId={selectQuestionType}
                />
              </div>

              {(selectQuestionType as number) > 2 ? (
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
                    {options.map(({ name, id }, inx) => (
                      <div className="relative" key={"options-" + inx}>
                        <input
                          className="block w-full px-2 py-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-starStroke"
                          placeholder={`Type option ${inx + 1}`}
                          value={name ? name : ""}
                          required
                          onChange={(e) => onChangeOptions(id, e.target.value)}
                        />
                        <Trash2
                          className={`absolute end-2.5 bottom-4 z-10 ${
                            options.length > 1
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          } stroke-neutral-500`}
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
                  onClick={onClickCreateQuestion}
                >
                  {isAdded && selectedQuestionIndex ? "Update" : "Create"}{" "}
                  question
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t h-footer border-t-modalBorder relative">
        <Button
          className="ml-auto"
          disabled={Boolean(validateCreateTemplate)}
          onClick={() => setShowCreateModal(true)}
        >
          Create Template
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
