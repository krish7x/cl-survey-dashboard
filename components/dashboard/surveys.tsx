import { ISurvey } from '@/types';
import { Tooltip } from 'flowbite-react';
import { BarChart3, Eye, Send, Trash, Users } from 'lucide-react';
import Image from 'next/image';

import src from '../../public/not-found.png';
import SurevyIcon from '../micros/survey-icon';

export default function Surveys({
  surveys,
  setOpenModal,
  setSurveyId,
  onClickViewSurvey,
  onClickSendSurvey,
  onClickShowSurveyContacts,
  onClickShowCharts,
}: {
  surveys: ISurvey[];
  setOpenModal: (value: boolean) => void;
  setSurveyId: (value: string) => void;
  onClickViewSurvey: (id: string) => void;
  onClickSendSurvey: (id: string) => void;
  onClickShowSurveyContacts: (id: string) => void;
  onClickShowCharts: (id: string, surveyName: string) => void;
}) {
  return (
    <div className="flex h-full flex-col pt-5">
      {surveys.length ? (
        surveys.map(
          ({ id, surveyName, project: { projectName }, updatedAt }) => (
            <div
              key={'survey-' + id}
              className="flex w-full  cursor-pointer justify-between border-b border-b-navBorder py-4 hover:bg-green-100"
            >
              <div className="flex w-full items-center justify-between px-2">
                <div className="group flex gap-4">
                  <SurevyIcon />
                  <div className="flex flex-col gap-1 py-2">
                    <h3 className="text-sm font-medium text-txtBlack">
                      {surveyName}
                    </h3>
                    <p className="text-xs text-txtPurple">
                      Linked to <strong>{projectName}</strong> . Last modified:{' '}
                      <strong>{updatedAt}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tooltip content="View Survey Analytics">
                    <BarChart3
                      className="mx-2 mt-4 stroke-txtPurple"
                      onClick={() => onClickShowCharts(id, surveyName)}
                    />
                  </Tooltip>
                  <Tooltip content="View Survey Contacts">
                    <Users
                      className="mx-2 mt-4 stroke-txtPurple"
                      onClick={() => onClickShowSurveyContacts(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Trigger Survey">
                    <Send
                      className="mx-2 mt-4 stroke-txtPurple"
                      onClick={() => onClickSendSurvey(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Survey Details">
                    <Eye
                      className="mx-2 mt-4 stroke-txtPurple"
                      onClick={() => onClickViewSurvey(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Delete Survey">
                    <Trash
                      className="mx-2 mt-4 stroke-txtPurple"
                      onClick={() => {
                        setOpenModal(true);
                        setSurveyId(id);
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          ),
        )
      ) : (
        <div className="mb-20 flex flex-1 flex-col items-center justify-center gap-2">
          <Image
            src={src}
            alt="survey"
            width={72}
            height={72}
            className="mb-1 stroke-sidebarText opacity-60"
          />
          <h1 className="text-2xl font-medium text-sidebarText">
            No Surveys found for this project!
          </h1>
        </div>
      )}
    </div>
  );
}
