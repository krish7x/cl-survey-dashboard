import { templateQuestionsAtom } from '@/store/atom';
import { ITemplateLeftPanel } from '@/types/props/template-left-panel';
import { Button } from 'flowbite-react';
import { useAtom } from 'jotai';
import truncate from 'lodash.truncate';
import { File, Plus, Trash2 } from 'lucide-react';
import { memo } from 'react';

export default memo(function TemplateModalLeftPanel({
  dragQuestionRef,
  draggedOverQuestionRef,
  selectedQuestionIndex,
  addQuestionValidation,
  handleSelectQuestion,
  handleSort,
  onClickDeleteTemplateQuestion,
  addEmptyQuestion,
}: ITemplateLeftPanel) {
  const [templateQuestion] = useAtom(templateQuestionsAtom);

  return (
    <div className="flex w-modal-left flex-col gap-4 overflow-y-scroll border-r border-custom-11 p-6 pb-16 scrollbar-hide">
      {templateQuestion?.map(({ title }, inx) => {
        return (
          <div
            id={'template-question-' + inx}
            className="flex cursor-grab flex-col"
            key={'question-' + inx}
            draggable
            onClick={() => handleSelectQuestion(inx)}
            onDragStart={() => (dragQuestionRef.current = inx)}
            onDragEnter={() => (draggedOverQuestionRef.current = inx)}
            onDragEnd={handleSort}
            onDragOver={e => e.preventDefault()}
          >
            <div
              className={`flex w-full cursor-pointer rounded-md border border-l-4 border-l-custom-7 px-3 py-2 hover:bg-green-100
            ${(selectedQuestionIndex as number) - 1 === inx ? 'bg-custom-5' : ''}`}
            >
              <div className="flex w-full justify-between">
                <div className="flex">
                  <p className="select-none text-sm font-normal text-custom-13">
                    {inx + 1}.{' '}
                    {truncate(title ? title : 'Draft', {
                      length: 40,
                    })}
                  </p>
                  {!title && <File className="ml-2 stroke-gray-300" />}
                </div>
                <Trash2
                  className="ml-2 stroke-custom-3 opacity-80"
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
        id="btn-add-question"
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
  );
});
