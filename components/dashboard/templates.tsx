import { ITemplate } from '@/types';
import { Tooltip } from 'flowbite-react';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

import src from '../../public/not-found.png';
import TemplateIcon from '../micros/template-icon';

export default function Templates({
  templates,
  setOpenModal,
  setTemplateId,
  onClickEditTemplate,
}: {
  templates: ITemplate[];
  setOpenModal: (value: boolean) => void;
  setTemplateId: (value: string) => void;
  onClickEditTemplate: (id: string) => void;
}) {
  return (
    <div className="flex h-full flex-col pt-5">
      {templates.length ? (
        templates.map(({ id, templateName, templateJsonData, updatedAt }) => (
          <div
            key={'survey-' + id}
            className="flex w-full  cursor-pointer justify-between border-b border-b-navBorder py-4 hover:bg-green-100"
          >
            <div className="flex w-full items-center justify-between px-2">
              <div className="group flex gap-4">
                <TemplateIcon />
                <div className="flex flex-col gap-1 py-2">
                  <h3 className="text-sm font-medium text-txtBlack">
                    {templateName}
                  </h3>
                  <p className="text-xs text-txtPurple">
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
                <Tooltip content="Template Details">
                  <Pencil
                    className="mt-4 stroke-txtPurple"
                    onClick={() => onClickEditTemplate(id)}
                  />
                </Tooltip>
                <Tooltip content="Delete template">
                  <Trash2
                    className="mt-4 stroke-txtPurple"
                    onClick={() => {
                      setOpenModal(true);
                      setTemplateId(id);
                    }}
                  />
                </Tooltip>
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
            className="mb-1 stroke-sidebarText opacity-60"
          />
          <h1 className="text-2xl font-medium text-sidebarText">
            No Templates found for this project!
          </h1>
        </div>
      )}
    </div>
  );
}
