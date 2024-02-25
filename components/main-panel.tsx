import { tabsAtom, userAtom } from "@/store/atom";
import { Button, Modal } from "flowbite-react";
import { useAtomValue } from "jotai";
import { AlertOctagon, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { ISurvey, ITemplate } from "@/types";
import Surveys from "./surveys";
import Templates from "./templates";

export default function MainPanel({
  surveys,
  templates,
  setShowTemplateModal,
  onClickDeleteSurvey,
  onClickDeleteTemplate,
  setShowSurveyModal,
}: {
  surveys: ISurvey[];
  templates: ITemplate[];
  setShowTemplateModal: (value: boolean) => void;
  setShowSurveyModal: (value: boolean) => void;
  onClickDeleteSurvey: (id: number) => void;
  onClickDeleteTemplate: (id: number) => void;
}) {
  const user = useAtomValue(userAtom);
  const tab = useAtomValue(tabsAtom);
  const isAdmin = useMemo(() => user && user.role === "admin", [user]);
  const [openModal, setOpenModal] = useState(false);
  const [surveyId, setSurveyId] = useState<number>(0);
  const [templateId, setTemplateId] = useState<number>(0);

  return (
    <div className="px-10 bg-white flex flex-col py-6 w-full h-full overflow-y-scroll scrollbar-hide">
      <div className="flex justify-between items-center">
        <div className="opacity-0">Surveys</div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => setShowTemplateModal(true)}
            >
              <div className="flex gap-1 items-center">
                Create Template <Plus size={16} color="#fff" />
              </div>
            </Button>
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => setShowSurveyModal(true)}
            >
              <div className="flex gap-1 items-center">
                Create Survey <Plus size={16} color="#fff" />
              </div>
            </Button>
          </div>
        )}
      </div>

      {tab.id === 1 ? (
        <Surveys
          surveys={surveys}
          setOpenModal={setOpenModal}
          setSurveyId={setSurveyId}
        />
      ) : (
        <Templates
          templates={templates}
          setOpenModal={setOpenModal}
          setTemplateId={setTemplateId}
        />
      )}

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AlertOctagon className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this{" "}
              {tab.id === 1 ? "survey" : "template"}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  if (tab.id === 1) {
                    onClickDeleteSurvey(surveyId);
                  } else {
                    onClickDeleteTemplate(templateId);
                  }
                  setOpenModal(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
