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
    <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Create New Project
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Project title" />
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="title.."
              className="focus:border-none focus:outline-none"
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
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              placeholder="description.."
              value={description}
              onChange={(event) =>
                setProjectDetails({
                  description: event.target.value,
                })
              }
              className="h-16 p-3"
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
