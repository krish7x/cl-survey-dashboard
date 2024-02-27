import { Eye, Send, Trash, Trash2, Users, BarChart3 } from "lucide-react";
import SurevyIcon from "./survey-icon";
import Image from "next/image";
import { ISurvey } from "@/types";
import src from "../public/not-found.png";
import { Tooltip } from "flowbite-react";

export default function Surveys({
  surveys,
  setOpenModal,
  setSurveyId,
  onClickViewSurvey,
  onClickSendSurvey,
  onClickShowSurveyContacts,
  onClickShowCharts
}: {
  surveys: ISurvey[];
  setOpenModal: (value: boolean) => void;
  setSurveyId: (value: number) => void;
  onClickViewSurvey: (id: number) => void;
  onClickSendSurvey: (id: number) => void;
  onClickShowSurveyContacts: (id: number) => void;
  onClickShowCharts: (id: number, surveyName: any) => void
}) {
  return (
    <div className="flex flex-col pt-5 h-full">
      {surveys.length ? (
        surveys.map(
          ({ id, surveyName, project: { projectName }, lastModifiedDate }) => (
            <div
              key={"survey-" + id}
              className="flex w-full  justify-between border-b border-b-navBorder py-4 cursor-pointer hover:bg-green-100"
            >
              <div className="flex w-full justify-between px-2 items-center">
                <div className="flex gap-4 group">
                  <SurevyIcon />
                  <div className="flex flex-col gap-1 py-2">
                    <h3 className="text-txtBlack text-sm font-medium">
                      {surveyName}
                    </h3>
                    <p className="text-xs text-txtPurple">
                      Linked to <strong>{projectName}</strong> . Last modified:{" "}
                      <strong>{lastModifiedDate}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Tooltip content="View Survey Analytics">
                    <BarChart3
                      className="mt-4 mx-2 stroke-txtPurple"
                      onClick={() => onClickShowCharts(id, surveyName)}
                    />
                  </Tooltip>
                  <Tooltip content="View Survey Contacts">
                    <Users
                      className="mt-4 mx-2 stroke-txtPurple"
                      onClick={() => onClickShowSurveyContacts(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Trigger Survey">
                    <Send
                      className="mt-4 mx-2 stroke-txtPurple"
                      onClick={() => onClickSendSurvey(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Survey Details">
                    <Eye
                      className="mt-4 mx-2 stroke-txtPurple"
                      onClick={() => onClickViewSurvey(id)}
                    />
                  </Tooltip>
                  <Tooltip content="Delete Survey">
                    <Trash
                      className="mt-4 mx-2 stroke-txtPurple"
                      onClick={() => {
                        setOpenModal(true);
                        setSurveyId(id);
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <div className="flex flex-col justify-center items-center flex-1 gap-2 mb-20">
          <Image
            src={src}
            alt="survey"
            width={72}
            height={72}
            className="mb-1 stroke-sidebarText opacity-60"
          />
          <h1 className="text-sidebarText font-medium text-2xl">
            No Surveys found for this project!
          </h1>
        </div>
      )}
    </div>
  );
}
