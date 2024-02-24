import { userAtom } from "@/store/atom";
import { Button, Modal } from "flowbite-react";
import { useAtomValue } from "jotai";
import { AlertOctagon, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { ISurvey } from "@/types";
import SurevyIcon from "./survey-icon";

export default function MainPanel({
  surveys,
  setShowTemplateModal,
  onClickDeleteSurvey,
}: {
  surveys: ISurvey[];
  setShowTemplateModal: (value: boolean) => void;
  onClickDeleteSurvey: (id: number) => void;
}) {
  const user = useAtomValue(userAtom);
  const isAdmin = useMemo(() => user && user.role === "admin", [user]);
  const [openModal, setOpenModal] = useState(false);
  const [surveyId, setSurveyId] = useState<number>(0);

  return (
    <div className="px-10 flex flex-col gap-5 py-6 w-full h-full overflow-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-txtBlack font-semibold">Surveys</h1>
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
            <Button gradientDuoTone="purpleToBlue">
              <div className="flex gap-1 items-center">
                Create Survey <Plus size={16} color="#fff" />
              </div>
            </Button>
          </div>
        )}
      </div>

      {surveys.length
        ? surveys.map(({ id, surveyName, updatedAt }) => (
            <div
              key={"survey-" + id}
              className="flex w-full  justify-between border-b border-b-navBorder py-4 cursor-pointer hover:bg-green-100"
            >
              <div className="flex w-full justify-between px-2" items-center>
                <div className="flex gap-2 group">
                  <SurevyIcon />
                  <div className="flex flex-col gap-1 py-2">
                    <h3 className="text-txtBlack text-sm font-medium">
                      {surveyName}
                    </h3>
                    {/* TODO */}
                    <p className="text-xs text-txtPurple">
                      Linked to Project . Last modified: {updatedAt}
                    </p>
                  </div>
                </div>
                <Trash2
                  color="#25292D"
                  className="mt-3"
                  onClick={() => {
                    setOpenModal(true);
                    setSurveyId(id);
                  }}
                />
              </div>
            </div>
          ))
        : null}

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AlertOctagon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this survey?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  onClickDeleteSurvey(surveyId);
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
