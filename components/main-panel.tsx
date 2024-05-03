import { tabsAtom, userAtom } from '@/store/atom';
import { ISurvey, ITemplate } from '@/types';
import { Button, Modal } from 'flowbite-react';
import { useAtomValue } from 'jotai';
import { AlertOctagon, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import MainPanelSkeleton from './main-panel-skeleton';
import Surveys from './surveys';
import Templates from './templates';

export default function MainPanel({
  surveys,
  templates,
  isSurveyLoaded,
  isTemplateLoaded,
  setShowTemplateModal,
  onClickViewSurvey,
  onClickEditTemplate,
  onClickDeleteSurvey,
  onClickDeleteTemplate,
  setShowSurveyModal,
  onClickSendSurvey,
  onClickShowCharts,
  onClickShowSurveyContacts,
  resetForCreateSurvey,
  resetForCreateTemplate,
}: {
  surveys: ISurvey[];
  templates: ITemplate[];
  isSurveyLoaded: boolean;
  isTemplateLoaded: boolean;
  setShowTemplateModal: (value: boolean) => void;
  setShowSurveyModal: (value: boolean) => void;
  onClickSendSurvey: (id: number) => void;
  onClickShowCharts: (id: number, surveyName: string) => void;
  onClickViewSurvey: (id: number) => void;
  onClickEditTemplate: (id: number) => void;
  onClickDeleteSurvey: (id: number) => void;
  onClickDeleteTemplate: (id: number) => void;
  onClickShowSurveyContacts: (id: number) => void;
  resetForCreateSurvey: () => void;
  resetForCreateTemplate: () => void;
}) {
  const user = useAtomValue(userAtom);
  const tab = useAtomValue(tabsAtom);
  const isAdmin = useMemo(() => user && user.role === 'admin', [user]);
  const [openModal, setOpenModal] = useState(false);
  const [surveyId, setSurveyId] = useState<number>(0);
  const [templateId, setTemplateId] = useState<number>(0);

  return (
    <div className="flex h-full w-full flex-col overflow-y-scroll bg-white px-10 py-6 scrollbar-hide">
      <div className="flex items-center justify-between">
        <div className="opacity-0">Surveys</div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => {
                resetForCreateSurvey();
                setShowTemplateModal(true);
              }}
            >
              <div className="flex items-center gap-1">
                Create Template{' '}
                <Plus
                  size={16}
                  color="#fff"
                />
              </div>
            </Button>
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => {
                setShowSurveyModal(true);
                resetForCreateTemplate();
              }}
            >
              <div className="flex items-center gap-1">
                Create Survey{' '}
                <Plus
                  size={16}
                  color="#fff"
                />
              </div>
            </Button>
          </div>
        )}
      </div>

      {tab.id === 1 ? (
        isSurveyLoaded ? (
          <Surveys
            surveys={surveys}
            setOpenModal={setOpenModal}
            setSurveyId={setSurveyId}
            onClickViewSurvey={onClickViewSurvey}
            onClickSendSurvey={onClickSendSurvey}
            onClickShowSurveyContacts={onClickShowSurveyContacts}
            onClickShowCharts={onClickShowCharts}
          />
        ) : (
          <MainPanelSkeleton />
        )
      ) : null}

      {tab.id === 2 ? (
        isTemplateLoaded ? (
          <Templates
            onClickEditTemplate={onClickEditTemplate}
            templates={templates}
            setOpenModal={setOpenModal}
            setTemplateId={setTemplateId}
          />
        ) : (
          <MainPanelSkeleton />
        )
      ) : null}

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AlertOctagon className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this{' '}
              {tab.id === 1 ? 'survey' : 'template'}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  if (tab.id === 1) {
                    onClickDeleteSurvey(surveyId);
                  } else {
                    onClickDeleteTemplate(templateId);
                  }
                  setOpenModal(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={() => setOpenModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
