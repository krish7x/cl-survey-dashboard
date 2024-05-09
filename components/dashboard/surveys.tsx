import { confirmationAtom } from '@/store/atom';
import { ISurvey } from '@/types';
import { Tooltip } from 'flowbite-react';
import { useSetAtom } from 'jotai';
import { BarChart3, Eye, Send, Trash, Users } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';

import src from '../../public/not-found.png';
import SurevyIcon from '../micros/survey-icon';

export default function Surveys({
  surveys,
  onClickViewSurvey,
  onClickSendSurvey,
  onClickShowSurveyContacts,
  onClickShowCharts,
  onClickDeleteSurvey,
}: {
  surveys: ISurvey[];
  onClickViewSurvey: (id: string) => void;
  onClickSendSurvey: (id: string) => void;
  onClickShowSurveyContacts: (id: string) => void;
  onClickDeleteSurvey: (id: string) => void;
  onClickShowCharts: (id: string, surveyName: string) => void;
}) {
  const setAtom = useSetAtom(confirmationAtom);

  const onClickDelete = useCallback(
    (id: string) => {
      setAtom({
        show: true,
        alertText: 'Are you sure you want to delete this survey?',
        acceptCtaText: "Yes, I'm sure",
        rejectCtaText: 'No, cancel',
        onAccept: (id: string) => onClickDeleteSurvey(id),
        params: [id],
      });
    },
    [onClickDeleteSurvey, setAtom],
  );
  return (
    <div className="flex h-full flex-col pt-5">
      {surveys.length ? (
        surveys.map(
          ({ id, surveyName, project: { projectName }, updatedAt }) => (
            <div
              key={'survey-' + id}
              className="flex w-full cursor-pointer justify-between border-b border-b-custom-5 py-4 hover:bg-green-100"
            >
              <div className="flex w-full items-center justify-between px-2">
                <div className="group flex gap-4">
                  <SurevyIcon />
                  <div className="flex flex-col gap-1 py-2">
                    <h3 className="text-sm font-medium text-custom-4">
                      {surveyName}
                    </h3>
                    <p className="text-xs text-custom-3">
                      Linked to <strong>{projectName}</strong> . Last modified:{' '}
                      <strong>{updatedAt}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tooltip content="View Survey Analytics">
                    <BarChart3
                      className="mx-2 mt-4 stroke-custom-3"
                      onClick={() => onClickShowCharts(id, surveyName)}
                    />
                  </Tooltip>
                  <Tooltip content="View Survey Contacts">
                    <Users
                      className="mx-2 mt-4 stroke-custom-3"
                      onClick={() => onClickShowSurveyContacts(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Trigger Survey">
                    <Send
                      className="mx-2 mt-4 stroke-custom-3"
                      onClick={() => onClickSendSurvey(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Survey Details">
                    <Eye
                      className="mx-2 mt-4 stroke-custom-3"
                      onClick={() => onClickViewSurvey(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Delete Survey">
                    <Trash
                      id="btn-delete-survey"
                      className="mx-2 mt-4 stroke-custom-3"
                      onClick={() => {
                        onClickDelete(id);
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
            className="mb-1 stroke-custom-6 opacity-60"
          />
          <h1 className="text-2xl font-medium text-custom-6">
            No Surveys found for this project!
          </h1>
        </div>
      )}
    </div>
  );
}
