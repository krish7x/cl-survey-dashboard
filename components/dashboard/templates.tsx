import { confirmationAtom, userAtom } from '@/store/atom';
import { ITemplate } from '@/types';
import { Tooltip } from 'flowbite-react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';

import src from '../../public/not-found.png';
import TemplateIcon from '../micros/template-icon';

export default function Templates({
  templates,
  onClickDeleteTemplate,
  onClickEditTemplate,
}: {
  templates: ITemplate[];
  onClickDeleteTemplate: (id: string) => void;
  onClickEditTemplate: (id: string) => void;
}) {
  const user = useAtomValue(userAtom);
  const setAtom = useSetAtom(confirmationAtom);
  const isAdmin = useMemo(() => user && user.role === 'admin', [user]);

  const onClickDelete = useCallback(
    (id: string) => {
      setAtom({
        show: true,
        alertText: 'Are you sure you want to delete this template?',
        acceptCtaText: "Yes, I'm sure",
        rejectCtaText: 'No, cancel',
        onAccept: (id: string) => onClickDeleteTemplate(id),
        params: [id],
      });
    },
    [onClickDeleteTemplate, setAtom],
  );
  return (
    <div className="flex h-full flex-col pt-5">
      {templates.length ? (
        templates.map(({ id, templateName, templateJsonData, updatedAt }) => (
          <div
            key={'survey-' + id}
            className="flex w-full  cursor-pointer justify-between border-b border-b-custom-5 py-4 hover:bg-green-100"
          >
            <div className="flex w-full items-center justify-between px-2">
              <div className="group flex gap-4">
                <TemplateIcon />
                <div className="flex flex-col gap-1 py-2">
                  <h3 className="text-sm font-medium text-custom-4">
                    {templateName}
                  </h3>
                  <p className="text-xs text-custom-3">
                    {(templateJsonData || [])?.length ? `No of question: ` : ''}
                    {'     '}
                    {templateJsonData?.length ? (
                      <strong>{templateJsonData?.length}</strong>
                    ) : null}
                    <span>{'  '}</span>Last modified:{' '}
                    <strong>{updatedAt}</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Tooltip content="Update Template">
                    <Pencil
                      id="btn-update-template"
                      className="mt-4 stroke-custom-3"
                      onClick={() => onClickEditTemplate(id)}
                    />
                  </Tooltip>
                )}
                {isAdmin && (
                  <Tooltip content="Delete template">
                    <Trash2
                      id="btn-delete-template"
                      className="mt-4 stroke-custom-3"
                      onClick={() => {
                        onClickDelete(id);
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        ))
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
            No Templates found for this project!
          </h1>
        </div>
      )}
    </div>
  );
}
