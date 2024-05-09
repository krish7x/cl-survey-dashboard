import { questionTypeOptions } from '@/constants/questionTypes';
import { confirmationAtom, templateQuestionsAtom } from '@/store/atom';
import { ILinkDetails, IOptions, ITemplateQuestion } from '@/types';
import { ITemplateModal } from '@/types/props/template-modal';
import { Button, Modal } from 'flowbite-react';
import { useAtom, useSetAtom } from 'jotai';
import isEqual from 'lodash.isequal';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import TemplateModalLeftPanel from './template-modal-left-panel';
import TemplateModalRightPanel from './template-modal-right-panel';
import TemplateQuestionModal from './template-question-modal';

export default memo(function TemplateModal({
  showModal,
  createTemplateLoading,
  isTemplateEdit,
  setShowModal,
  setShowTemplateCreateModal,
  resetForCreateTemplate,
  onClickCreateOrUpdate,
}: ITemplateModal) {
  //states
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
  const [templateQuestionClone, setTemplateQuestionClone] = useState<
    ITemplateQuestion[]
  >([]);

  //atom
  const [templateQuestion, setTemplateQuestion] = useAtom(
    templateQuestionsAtom,
  );
  const setAtom = useSetAtom(confirmationAtom);

  //callbacks
  const onClickAddOptions = useCallback(() => {
    const id = options[options.length - 1].id;
    const emptyOptions: IOptions = {
      id: +id + 1,
      name: '',
    };
    setOptions([...options, emptyOptions]);
  }, [options]);

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

  const handleSort = useCallback(() => {
    let clone = [...templateQuestion];
    const tempDraggedQuestion = clone[dragQuestionRef.current];
    const tempDraggedOverQuestion = clone[draggedOverQuestionRef.current];
    clone[dragQuestionRef.current] = clone[draggedOverQuestionRef.current];
    clone[draggedOverQuestionRef.current] = tempDraggedQuestion;
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

  const onClose = useCallback(() => {
    resetAll();
    resetForCreateTemplate();
    setShowModal(false);
    setShowTemplateCreateModal(false);
    setShowQuestion(false);
  }, [
    resetAll,
    resetForCreateTemplate,
    setShowModal,
    setShowTemplateCreateModal,
  ]);

  const showConfirmationModal = useCallback(() => {
    setAtom({
      show: true,
      alertText: 'Are you sure you want to end the template updation progress?',
      acceptCtaText: "Yes, I'm sure",
      rejectCtaText: 'No, cancel',
      onAccept: onClose,
      params: [],
    });
  }, [onClose, setAtom]);

  //memos
  const validation = useMemo(() => {
    if (!questionTitle) return false;
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
  }, [options, questionTitle, selectQuestionType, selectedOptionPos]);

  const hideNPS = useMemo(() => {
    if (templateQuestion.length === 1) return false;
    const npsIndex = templateQuestion.findIndex(val => val.optionTypeId === 1);
    if (npsIndex === -1) return false;
    return npsIndex !== 1 && npsIndex + 1 !== selectedQuestionIndex;
  }, [templateQuestion, selectedQuestionIndex]);

  const addQuestionValidation = useMemo(() => {
    if (!templateQuestion.length && !showQuestion) return true;
    return templateQuestion.length && templateQuestion.every(val => val.title);
  }, [showQuestion, templateQuestion]);

  const validateCreateTemplate = useMemo(() => {
    if (templateQuestion.length === 1)
      return templateQuestion[0].optionTypeId !== 1;
    return !addQuestionValidation;
  }, [addQuestionValidation, templateQuestion]);

  const deepCompare = useMemo(
    () => isEqual(templateQuestionClone, templateQuestion),
    [templateQuestion, templateQuestionClone],
  );

  const dragQuestionRef = useRef<number>(0);
  const draggedOverQuestionRef = useRef<number>(0);

  //side effects
  useEffect(() => {
    setTemplateQuestionClone(templateQuestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

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
      onClose={() => (deepCompare ? onClose() : showConfirmationModal())}
      popup
    >
      <Modal.Body className="overflow-hidden p-0">
        <Modal.Header className="relative border-b border-b-custom-11">
          <span className="absolute left-[calc(50%-96px)]">
            {isTemplateEdit ? 'Update' : 'Build'}
            {' template'}
          </span>
        </Modal.Header>
        <div className="flex h-template-modal w-full p-0 ">
          <TemplateModalLeftPanel
            dragQuestionRef={dragQuestionRef}
            draggedOverQuestionRef={draggedOverQuestionRef}
            selectedQuestionIndex={selectedQuestionIndex}
            addQuestionValidation={addQuestionValidation}
            handleSort={handleSort}
            addEmptyQuestion={addEmptyQuestion}
            handleSelectQuestion={handleSelectQuestion}
            onClickDeleteTemplateQuestion={onClickDeleteTemplateQuestion}
          />
          <TemplateModalRightPanel
            showQuestion={showQuestion}
            selectedQuestionIndex={selectedQuestionIndex}
            questionTitle={questionTitle}
            questionDescription={questionDescription}
            hideNPS={hideNPS}
            selectQuestionType={selectQuestionType}
            ratingRange={ratingRange}
            options={options}
            selectedOptionPos={selectedOptionPos}
            validation={validation}
            isAdded={isAdded}
            setQuestionTitle={setQuestionTitle}
            setQuestionDescription={setQuestionDescription}
            setSelectQuestionType={setSelectQuestionType}
            setRatingRange={setRatingRange}
            setSelectedOptionPos={setSelectedOptionPos}
            setOptions={setOptions}
            handleLinkQuestion={handleLinkQuestion}
            onChangeOptions={onChangeOptions}
            onLinkUpdateOptions={onLinkUpdateOptions}
            onClickDeleteOption={onClickDeleteOption}
            onClickAddOptions={onClickAddOptions}
            onClickCreateQuestion={onClickCreateQuestion}
          />
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
      <Modal.Footer className="relative flex h-footer items-center justify-between border-t border-t-custom-11">
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
