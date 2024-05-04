'use client';

import { ISendSurveyDetails } from '@/types';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

export default function SurveyModal({
  showSendSurveyModal,
  sendSurveyDetails,
  isProcessing,
  setShowSendSurveyModal,
  setSendSurveyDetails,
  onSendSurvey,
}: {
  showSendSurveyModal: boolean;
  isProcessing: boolean;
  sendSurveyDetails: ISendSurveyDetails;
  setShowSendSurveyModal: (val: boolean) => void;
  setSendSurveyDetails: (val: Partial<ISendSurveyDetails>) => void;
  onSendSurvey: () => void;
}) {
  return (
    <Modal
      show={showSendSurveyModal}
      size="lg"
      onClose={() => {
        setShowSendSurveyModal(false);
      }}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Send a survey
          </h3>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="name"
                value="Customer name"
              />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="John"
              value={sendSurveyDetails.contactName}
              required
              onChange={e =>
                setSendSurveyDetails({
                  contactName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="Customer email"
              />
            </div>
            <TextInput
              id="name"
              type="email"
              placeholder="john@example.com"
              value={sendSurveyDetails.contactEmailId}
              required
              onChange={e =>
                setSendSurveyDetails({
                  contactEmailId: e.target.value,
                })
              }
            />
          </div>

          <div className="w-full">
            <Button
              disabled={
                !sendSurveyDetails.contactName ||
                !sendSurveyDetails.contactEmailId
              }
              isProcessing={isProcessing}
              onClick={onSendSurvey}
            >
              Send survey
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
