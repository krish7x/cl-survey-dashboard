import { ILinkDetails, IOptions, ITemplateQuestion } from "@/types";
import { Button, Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { templateQuestionsAtom } from "@/store/atom";
import Radio from "./radio";

export default function TemplateQuestionModal({
  showModal,
  setShowModal,
  linkDetails,
  questions,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  linkDetails?: ILinkDetails;
  questions: ITemplateQuestion[];
}) {
  const [templateQuestion, setTemplateQuestion] = useAtom(
    templateQuestionsAtom
  );

  const [selectedQuestionId, setSelectedQuestionId] = useState<
    string | number
  >();

  //to pre-poulate linked question
  useEffect(() => {
    const cloneTemplateQuestions = [...templateQuestion];
    const selectedQuestion = cloneTemplateQuestions.find(
      (val) => val.questionId === linkDetails?.questionId
    );
    const options = selectedQuestion?.optionsJson?.options;
    const currentSelectedOption = options?.find(
      (val) => val.id === linkDetails?.optionId
    );
    if (selectedQuestion) {
      setSelectedQuestionId(currentSelectedOption?.linkedTo || undefined);
    }
  }, [linkDetails, templateQuestion, showModal]);

  const handleLinking = useCallback(() => {
    const cloneTemplateQuestions = [...templateQuestion];
    const questionId = cloneTemplateQuestions.findIndex(
      (val) => val.questionId === linkDetails?.questionId
    );
    const selectedQuestionOptions = [
      ...(cloneTemplateQuestions[questionId].optionsJson
        ?.options as IOptions[]),
    ];
    const selectedOptionIndex = selectedQuestionOptions.findIndex(
      (val) => val.id === linkDetails?.optionId
    );
    selectedQuestionOptions[selectedOptionIndex].linkedTo = selectedQuestionId;
    cloneTemplateQuestions.map((val) => {
      if (val.questionId === linkDetails?.questionId) {
        return {
          ...val,
          optionsJson: {
            ...val.optionsJson,
            options: selectedQuestionOptions,
          },
        };
      }
      return val;
    });
    setTemplateQuestion(cloneTemplateQuestions);
    setShowModal(false);
  }, [
    linkDetails?.optionId,
    linkDetails?.questionId,
    selectedQuestionId,
    setShowModal,
    setTemplateQuestion,
    templateQuestion,
  ]);

  return (
    <Modal
      show={showModal}
      size="3xl"
      onClose={() => {
        setShowModal(false);
        setSelectedQuestionId(undefined);
      }}
      popup
    >
      <Modal.Body className="p-0 overflow-y-scroll">
        <Modal.Header className="border-b border-b-modalBorder relative">
          <span className="absolute left-[calc(50%-96px)]">
            Link a question
          </span>
        </Modal.Header>

        <div className="flex flex-col gap-4 pl-5 py-8">
          <Radio
            options={
              questions.map(({ questionId, title }) => ({
                id: questionId,
                name: title,
              })) as IOptions[]
            }
            idText={"linked"}
            checkedId={selectedQuestionId}
            onChange={(e) => setSelectedQuestionId(e)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t h-16 flex justify-between items-center border-t-modalBorder relative">
        <Button
          className="ml-auto"
          disabled={!Boolean(selectedQuestionId)}
          onClick={handleLinking}
        >
          Link
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
