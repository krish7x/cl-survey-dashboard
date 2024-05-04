import { MutableRefObject } from 'react';

export interface ITemplateLeftPanel {
  dragQuestionRef: MutableRefObject<number>;
  draggedOverQuestionRef: MutableRefObject<number>;
  selectedQuestionIndex: number | null;
  addQuestionValidation: number | boolean;
  handleSelectQuestion: (value: number) => void;
  handleSort: () => void;
  onClickDeleteTemplateQuestion: (value: number) => void;
  addEmptyQuestion: () => void;
}
