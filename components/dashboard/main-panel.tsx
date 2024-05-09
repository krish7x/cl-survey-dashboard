import { tabsAtom, userAtom } from '@/store/atom';
import { IMainPanel } from '@/types/props/main-panel';
import { Button } from 'flowbite-react';
import { useAtomValue } from 'jotai';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';

import MainPanelSkeleton from '../micros/main-panel-skeleton';
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
}: IMainPanel) {
  const user = useAtomValue(userAtom);
  const tab = useAtomValue(tabsAtom);
  const isAdmin = useMemo(() => user && user.role === 'admin', [user]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-scroll bg-white px-10 py-6 scrollbar-hide">
      <div className="flex items-center justify-between">
        <div className="opacity-0">Surveys</div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button
              id="btn-create-template"
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
              id="btn-create-survey"
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
            onClickViewSurvey={onClickViewSurvey}
            onClickSendSurvey={onClickSendSurvey}
            onClickShowSurveyContacts={onClickShowSurveyContacts}
            onClickShowCharts={onClickShowCharts}
            onClickDeleteSurvey={onClickDeleteSurvey}
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
            onClickDeleteTemplate={onClickDeleteTemplate}
          />
        ) : (
          <MainPanelSkeleton />
        )
      ) : null}
    </div>
  );
}
