import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ITemplate } from "@/types";
import src from "../public/not-found.png";
import TemplateIcon from "./template-icon";

export default function Templates({
  templates,
  setOpenModal,
  setTemplateId,
}: {
  templates: ITemplate[];
  setOpenModal: (value: boolean) => void;
  setTemplateId: (value: number) => void;
}) {
  return (
    <div className="flex flex-col pt-5 h-full">
      {templates.length ? (
        templates.map(
          ({ id, templateName, templateJsonData, lastModifiedDate }) => (
            <div
              key={"survey-" + id}
              className="flex w-full  justify-between border-b border-b-navBorder py-4 cursor-pointer hover:bg-green-100"
            >
              <div className="flex w-full justify-between px-2" items-center>
                <div className="flex gap-4 group">
                  <TemplateIcon />
                  <div className="flex flex-col gap-1 py-2">
                    <h3 className="text-txtBlack text-sm font-medium">
                      {templateName}
                    </h3>
                    <p className="text-xs text-txtPurple">
                      {(templateJsonData || [])?.length
                        ? `No of question: `
                        : ""}{" "}
                      {templateJsonData?.length ? (
                        <strong>{templateJsonData?.length}</strong>
                      ) : null}
                      {"  "}Last modified: <strong>{lastModifiedDate}</strong>
                    </p>
                  </div>
                </div>
                <Trash2
                  className="mt-4 stroke-txtPurple"
                  onClick={() => {
                    setOpenModal(true);
                    setTemplateId(id);
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
            No Templates found for this project!
          </h1>
        </div>
      )}
    </div>
  );
}
