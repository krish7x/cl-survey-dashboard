import { templateQuestionsAtom } from '@/store/atom';
import { ILinkDetails, IOptions, ITemplateQuestion } from '@/types';
import { Button, Modal } from 'flowbite-react';
import { useAtom } from 'jotai';
import { Link, Unlink } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import Radio from './radio';

export default function TemplateQuestionModal({
  showModal,
  linkDetails,
  questions,
  setShowModal,
}: {
  showModal: boolean;
  linkDetails?: ILinkDetails;
  questions: ITemplateQuestion[];
  setShowModal: (value: boolean) => void;
}) {
  const [templateQuestion, setTemplateQuestion] = useAtom(
    templateQuestionsAtom,
  );

  const [selectedQuestionId, setSelectedQuestionId] = useState<
    string | number
  >();

  //to pre-poulate linked question
  useEffect(() => {
    const cloneTemplateQuestions = [...templateQuestion];
    const selectedQuestion = cloneTemplateQuestions.find(
      val => val.questionId === linkDetails?.questionId,
    );
    const options = selectedQuestion?.optionsJson?.options;
    const currentSelectedOption = options?.find(
      val => val.id === linkDetails?.optionId,
    );
    if (selectedQuestion) {
      setSelectedQuestionId(currentSelectedOption?.linkedTo || undefined);
    }
  }, [linkDetails, templateQuestion, showModal]);

  const handleLinking = useCallback(
    (unlink = false) => {
      const cloneTemplateQuestions = [...templateQuestion];
      const questionId = cloneTemplateQuestions.findIndex(
        val => val.questionId === linkDetails?.questionId,
      );
      const selectedQuestionOptions = [
        ...(cloneTemplateQuestions[questionId].optionsJson
          ?.options as IOptions[]),
      ];
      const selectedOptionIndex = selectedQuestionOptions.findIndex(
        val => val.id === linkDetails?.optionId,
      );
      selectedQuestionOptions[selectedOptionIndex].linkedTo = unlink
        ? ''
        : selectedQuestionId;
      cloneTemplateQuestions.map(val => {
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
      !unlink && setShowModal(false);
    },
    [
      linkDetails?.optionId,
      linkDetails?.questionId,
      selectedQuestionId,
      setShowModal,
      setTemplateQuestion,
      templateQuestion,
    ],
  );

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
      <Modal.Body className="p-0 overflow-y-scroll scrollbar-hide">
        <Modal.Header className="border-b border-b-modalBorder relative">
          <span className="absolute left-[calc(50%-96px)]">
            Link a question
          </span>
        </Modal.Header>

        <div className="flex flex-col gap-4 pl-5 py-8">
          <Radio
            options={
              questions
                .filter(val => val.title)
                .map(({ questionId, title }) => ({
                  id: 'q-' + questionId,
                  name: title,
                })) as IOptions[]
            }
            idText={'linked'}
            checkedId={
              selectedQuestionId ? 'q-' + selectedQuestionId : undefined
            }
            onChange={e => setSelectedQuestionId(+e.toString().split('-')[1])}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t h-16 flex justify-between items-center border-t-modalBorder relative">
        {selectedQuestionId ? (
          <Button
            className="ml-auto"
            disabled={!Boolean(selectedQuestionId)}
            onClick={() => handleLinking(true)}
          >
            Unlink
            <Unlink
              size={16}
              className="ml-1"
            />
          </Button>
        ) : null}
        <Button
          className="ml-auto"
          disabled={!Boolean(selectedQuestionId)}
          onClick={() => handleLinking()}
        >
          Link
          <Link
            size={16}
            className="ml-1"
          />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
