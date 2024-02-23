import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { Plus } from "lucide-react";

export default function TemplateModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}) {
  return (
    <Modal
      show={showModal}
      size="5xl"
      onClose={() => setShowModal(false)}
      popup
    >
      <Modal.Body className="p-0">
        <Modal.Header className="border-b border-b-modalBorder">
          <h1 className="ml-modalHeader mt-1 text-txtBlack">
            Build your template
          </h1>
        </Modal.Header>
        <div className="p-0 flex h-templateModal w-full">
          <div className="flex flex-col w-1/4 border-r border-modalBorder p-6">
            <Button className="bg-navLeftBorder">
              <div className="flex gap-1 items-center">
                Add a question <Plus size={20} color="#fff" />
              </div>
            </Button>
          </div>
          <div className="flex flex-col"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
