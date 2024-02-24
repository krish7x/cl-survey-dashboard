import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";

export default function TemplateCreateModal({
  showModal,
  setShowModal,
  title,
  description,
  setTemplateDetails,
  onClickCreate,
}: {
  showModal: boolean;
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Create New Template
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="templateTitle" value="Template title" />
            </div>
            <TextInput
              id="templateTitle"
              placeholder="title.."
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
              required
            />
          </div>

          <div className="w-full">
            <Button onClick={onClickCreate} disabled={!title || !description}>
              Create
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
