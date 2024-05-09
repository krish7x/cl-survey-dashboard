import { confirmationAtom } from '@/store/atom';
import { Button, Modal } from 'flowbite-react';
import { useAtom } from 'jotai';
import { AlertOctagon } from 'lucide-react';
import { useCallback } from 'react';

export default function ConfirmationModal() {
  const [value, setValue] = useAtom(confirmationAtom);
  const { show, alertText, acceptCtaText, rejectCtaText, onAccept, params } =
    value;
  const closeModal = useCallback(() => {
    setValue({
      ...value,
      show: false,
    });
  }, [setValue, value]);
  return (
    <Modal
      show={show}
      size="md"
      onClose={closeModal}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <AlertOctagon className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            {alertText}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                onAccept(...params);
                closeModal();
              }}
            >
              {acceptCtaText}
            </Button>
            <Button
              color="gray"
              onClick={closeModal}
            >
              {rejectCtaText}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
