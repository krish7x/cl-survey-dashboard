import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";

export default function TemplateCreateModal({
  showModal,
  disableCreateButton,
  createTemplateLoading,
  setShowModal,
  title,
  description,
  setTemplateDetails,
  onClickCreate,
}: {
  showModal: boolean;
  disableCreateButton: boolean;
  createTemplateLoading: boolean;
  setShowModal: (value: boolean) => void;
  title: string;
  description: string;
  setTemplateDetails: (value: object) => void;
  onClickCreate: () => void;
}) {
  return (
    <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
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
              id="description"
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

          {!disableCreateButton ? (
            <div className="w-full">
              <Button
                isProcessing={createTemplateLoading}
                onClick={onClickCreate}
                disabled={!title || !description}
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
