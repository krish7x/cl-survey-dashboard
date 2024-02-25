import { Trash2 } from "lucide-react";
import SurevyIcon from "./survey-icon";
import Image from "next/image";
import { ISurvey } from "@/types";
import src from "../public/not-found.png";

export default function Surveys({
  surveys,
  setOpenModal,
  setSurveyId,
}: {
  surveys: ISurvey[];
  setOpenModal: (value: boolean) => void;
  setSurveyId: (value: number) => void;
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
              <div className="flex w-full justify-between px-2" items-center>
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
                <Trash2
                  className="mt-4 stroke-txtPurple"
                  onClick={() => {
                    setOpenModal(true);
                    setSurveyId(id);
                  }}
                />
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
