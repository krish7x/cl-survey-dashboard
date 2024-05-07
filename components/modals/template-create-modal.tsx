import { IOptions } from '@/types';
import { ITemplateCreateModal } from '@/types/props/template-create-modal';
import { Button, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useMemo } from 'react';

import Radio from '../micros/radio';

export default function TemplateCreateModal({
  showModal,
  isTemplateEdit = false,
  title,
  description,
  option,
  projects,
  currentTemplates,
  currentProject,
  templateId,
  setShowModal,
  setTemplateDetails,
  onClickCreate,
  resetForCreateTemplate,
}: ITemplateCreateModal) {
  const templates: IOptions[] | undefined = useMemo(
    () =>
      currentTemplates?.map(val => ({
        id: val.id,
        name: val.templateName,
      })),
    [currentTemplates],
  );

  useEffect(() => {
    if (showModal) {
      setTemplateDetails({
        ...setTemplateDetails,
        projectId: currentProject?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, currentProject?.id, showModal]);

  const validation = useMemo(() => {
    if (option.id === 'template_1') return !title;
    return !title || !currentProject?.id || !templateId;
  }, [currentProject?.id, option.id, templateId, title]);

  return (
    <Modal
      show={showModal}
      size="md"
      onClose={() => {
        setShowModal(false);
        resetForCreateTemplate();
      }}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">
            {isTemplateEdit ? 'Update template' : 'Create new template'}
          </h3>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="templateTitle"
                value="Template title"
              />
            </div>
            <TextInput
              id="txt-template-title"
              placeholder="title.."
              className="focus:border-none focus:outline-none"
              value={title}
              onChange={event =>
                setTemplateDetails({
                  title: event.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="projectDescription"
                value="Description"
              />
            </div>
            <Textarea
              id="txt-template-description"
              placeholder="description.."
              value={description}
              onChange={event =>
                setTemplateDetails({
                  description: event.target.value,
                })
              }
              className="h-16 p-3"
              required
            />
          </div>

          {!isTemplateEdit && (
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="projectDescription"
                  value="Create as"
                />
              </div>
              <Radio
                options={[
                  {
                    id: 'template_1',
                    name: 'New Template',
                  },
                  {
                    id: 'template_2',
                    name: 'Existing Template',
                  },
                ]}
                onChange={id =>
                  setTemplateDetails({
                    option: {
                      id,
                    },
                  })
                }
                checkedId={option.id}
                stacked={false}
              />
            </div>
          )}

          {option.id === 'template_2' && !isTemplateEdit && (
            <>
              <div>
                <div className="my-2 block">
                  <Label
                    htmlFor="project"
                    value="Select Project"
                  />
                </div>
                <select
                  id="project"
                  className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pr-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={e =>
                    setTemplateDetails({
                      projectId: e.target.value,
                      templateId: 0,
                    })
                  }
                >
                  {projects.length
                    ? projects.map(({ id, name }) => (
                        <option
                          key={'project-' + id}
                          selected={id === currentProject?.id}
                          value={id}
                        >
                          {name}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              <div>
                <div className="my-2 block">
                  <Label
                    htmlFor="template"
                    value="Select Template"
                  />
                </div>
                <select
                  id="template"
                  className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pr-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={e =>
                    setTemplateDetails({
                      templateId: e.target.value,
                    })
                  }
                >
                  <option value={0}>Select Template</option>
                  {templates?.length
                    ? templates.map(({ id, name }) => (
                        <option
                          key={'template-' + id}
                          value={id}
                          selected={id === templateId}
                        >
                          {name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </>
          )}

          <div className="w-full">
            <Button
              onClick={onClickCreate}
              disabled={Boolean(validation)}
            >
              {isTemplateEdit ? 'Next' : 'Create'}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
