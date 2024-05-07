'use client';

import { IOptions } from '@/types';
import { ISurveyModal } from '@/types/props/survey-modal';
import { Button, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useMemo } from 'react';

export default function SurveyModal({
  showSurveyModal,
  createSurveyLoading,
  disableCreateButton,
  surveyDetails,
  projects,
  currentProject,
  currentTemplates,
  setshowSurveyModal,
  setSurveyDetails,
  onClickCreate,
  resetForCreateSurvey,
}: ISurveyModal) {
  const validation = useMemo(() => {
    const { title, projectId, templateId } = surveyDetails;
    return title && projectId && templateId;
  }, [surveyDetails]);

  const templates: IOptions[] | undefined = useMemo(
    () =>
      currentTemplates?.map(val => ({
        id: val.id,
        name: val.templateName,
      })),
    [currentTemplates],
  );

  useEffect(() => {
    if (showSurveyModal) {
      setSurveyDetails({
        ...surveyDetails,
        projectId: currentProject?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSurveyModal, currentProject?.id, setSurveyDetails]);

  return (
    <Modal
      show={showSurveyModal}
      size="lg"
      onClose={() => {
        setshowSurveyModal(false);
        resetForCreateSurvey();
      }}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {disableCreateButton ? 'Survey details' : 'Create New Survey'}
          </h3>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="title"
                value="Surevy title"
              />
            </div>
            <TextInput
              id="txt-survey-title"
              type="text"
              placeholder="title.."
              value={surveyDetails.title}
              required
              onChange={e =>
                setSurveyDetails({
                  title: e.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="description"
                value="Description"
              />
            </div>
            <Textarea
              id="txt-survey-description"
              placeholder="description.."
              value={surveyDetails.description}
              onChange={e =>
                setSurveyDetails({
                  description: e.target.value,
                })
              }
              className="h-16 p-3"
              required
            />
          </div>

          <div>
            <div className="my-2 block">
              <Label
                htmlFor="project"
                value="Select Project"
              />
            </div>
            <select
              id="dd-project"
              className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pr-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={surveyDetails?.projectId}
              onChange={e =>
                setSurveyDetails({
                  projectId: e.target.value,
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
              id="dd-template"
              className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pr-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={surveyDetails?.templateId}
              onChange={e =>
                setSurveyDetails({
                  templateId: e.target.value,
                })
              }
            >
              <option value={0}>Select Template</option>
              {templates?.length
                ? templates.map(({ id, name }) => (
                    <option
                      key={'project-' + id}
                      value={id}
                      selected={id === surveyDetails?.templateId}
                    >
                      {name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          {!disableCreateButton ? (
            <div className="w-full">
              <Button
                id="btn-create"
                isProcessing={createSurveyLoading}
                disabled={disableCreateButton || Boolean(!validation)}
                onClick={onClickCreate}
              >
                Create
              </Button>
            </div>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}
