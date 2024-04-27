import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import Radio from "./radio";
import { IOptions, IProject, ITemplate } from "@/types";
import { useEffect, useMemo } from "react";

export default function TemplateCreateModal({
  showModal,
  disableCreateButton,
  setShowModal,
  title,
  description,
  option,
  setTemplateDetails,
  onClickCreate,
  projects,
  currentTemplates,
  currentProject,
  templateId,
  resetForCreateTemplate,
}: {
  showModal: boolean;
  disableCreateButton: boolean;
  setShowModal: (value: boolean) => void;
  title: string;
  description: string;
  option: IOptions;
  setTemplateDetails: (value: object) => void;
  onClickCreate: () => void;
  currentTemplates?: ITemplate[];
  currentProject?: IProject;
  projects: IOptions[];
  templateId?: number;
  resetForCreateTemplate: () => void;
}) {
  const templates: IOptions[] | undefined = useMemo(
    () =>
      currentTemplates?.map((val) => ({
        id: val.id,
        name: val.templateName,
      })),
    [currentTemplates]
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
    if (option.id === "template_1") return !title || !description;
    return !title || !description || !currentProject?.id || !templateId;
  }, [currentProject?.id, description, option.id, templateId, title]);

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
            {disableCreateButton
              ? "View template details"
              : "Create new template"}
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="templateTitle" value="Template title" />
            </div>
            <TextInput
              id="templateTitle"
              placeholder="title.."
              className="focus:border-none focus:outline-none"
              value={title}
              onChange={(event) =>
                setTemplateDetails({
                  title: event.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="projectDescription" value="Description" />
            </div>
            <Textarea
              id="projectDescription"
              placeholder="description.."
              value={description}
              onChange={(event) =>
                setTemplateDetails({
                  description: event.target.value,
                })
              }
              className="h-16 p-3"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="projectDescription" value="Create as" />
            </div>
            <Radio
              options={[
                {
                  id: "template_1",
                  name: "New Template",
                },
                {
                  id: "template_2",
                  name: "Existing Template",
                },
              ]}
              onChange={(id) =>
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

          {option.id === "template_2" && (
            <>
              <div>
                <div className="block my-2">
                  <Label htmlFor="project" value="Select Project" />
                </div>
                <select
                  id="project"
                  className="block w-full pr-2 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setTemplateDetails({
                      projectId: +e.target.value,
                      templateId: 0,
                    })
                  }
                >
                  {projects.length
                    ? projects.map(({ id, name }) => (
                        <option
                          key={"project-" + id}
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
                <div className="block my-2">
                  <Label htmlFor="template" value="Select Template" />
                </div>
                <select
                  id="template"
                  className="block w-full pr-2 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setTemplateDetails({
                      templateId: +e.target.value,
                    })
                  }
                >
                  <option value={0}>Select Template</option>
                  {templates?.length
                    ? templates.map(({ id, name }) => (
                        <option
                          key={"template-" + id}
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

          {!disableCreateButton ? (
            <div className="w-full">
              <Button onClick={onClickCreate} disabled={Boolean(validation)}>
                Create
              </Button>
            </div>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}
