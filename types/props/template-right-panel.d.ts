import { IOptions } from '..';

export interface ITemplateRightPanel {
  showQuestion: boolean;
  selectedQuestionIndex: number | null;
  questionTitle: string;
  questionDescription: string;
  hideNPS: boolean;
  selectQuestionType: string | number;
  ratingRange: string | number;
  options: IOptions[];
  selectedOptionPos: string;
  validation: boolean;
  isAdded: boolean;
  setQuestionTitle: (value: string) => void;
  setQuestionDescription: (value: string) => void;
  setSelectQuestionType: (value: string | number) => void;
  setRatingRange: (value: string | number) => void;
  setSelectedOptionPos: (value: string) => void;
  setOptions: (value: IOptions[]) => void;
  handleLinkQuestion: (questionId: number, optionId: number) => void;
  onChangeOptions: (id: string | number, value: string) => void;
  onLinkUpdateOptions: () => void;
  onClickDeleteOption: (value: string | number) => void;
  onClickAddOptions: () => void;
  onClickCreateQuestion: () => void;
}
