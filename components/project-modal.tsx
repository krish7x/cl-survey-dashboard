import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";

export default function ProjectModal({
  showModal,
  setShowModal,
  title,
  description,
  setProjectDetails,
  onClickCreate,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  title: string;
  description: string;
  setProjectDetails: (value: object) => void;
  onClickCreate: () => void;
}) {
  return (
    <Modal
      show={showModal}
      size="md"
      onClose={() => setShowModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Create New Project
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="projectTitle" value="Project title" />
            </div>
            <TextInput
              id="projectTitle"
              placeholder="title.."
              value={title}
              onChange={(event) =>
                setProjectDetails({
                  title: event.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="projectTitle" value="Description" />
            </div>
            <Textarea
              id="projectTitle"
              placeholder="description.."
              value={description}
              onChange={(event) =>
                setProjectDetails({
                  description: event.target.value,
                })
              }
              required
            />
          </div>

          <div className="w-full">
            <Button onClick={onClickCreate}>Create</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
