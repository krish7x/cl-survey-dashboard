import { userAtom } from "@/store/atom";
import { Button } from "flowbite-react";
import { useAtomValue } from "jotai";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import SurevyIcon from "./survey-icon";

const SURVEYS = [
  {
    name: "Caratlane Store Survey",
    projectId: 1,
    project: "Caratlane NPS",
    lastModified: "4 hours ago",
    questions: [],
    responses: [],
    completionRate: 10,
  },
  {
    name: "Caratlane TAH Survey",
    projectId: 2,
    project: "Caratlane TAH",
    lastModified: "2 days ago",
    questions: [],
    responses: [],
    completionRate: 10,
  },
  {
    name: "Caratlane Store Survey",
    projectId: 1,
    project: "Caratlane NPS",
    lastModified: "4 hours ago",
    questions: [],
    responses: [],
    completionRate: 10,
  },
  {
    name: "Caratlane TAH Survey",
    projectId: 2,
    project: "Caratlane TAH",
    lastModified: "2 days ago",
    questions: [],
    responses: [],
    completionRate: 10,
  },
  {
    name: "Caratlane Store Survey",
    projectId: 1,
    project: "Caratlane NPS",
    lastModified: "4 hours ago",
    questions: [],
    responses: [],
    completionRate: 10,
  },
  {
    name: "Caratlane TAH Survey",
    projectId: 2,
    project: "Caratlane TAH",
    lastModified: "2 days ago",
    questions: [],
    responses: [],
    completionRate: 10,
  },
  {
    name: "Caratlane Store Survey",
    projectId: 1,
    project: "Caratlane NPS",
    lastModified: "4 hours ago",
    questions: [],
    responses: [],
    completionRate: 10,
  },
  {
    name: "Caratlane TAH Survey",
    projectId: 2,
    project: "Caratlane TAH",
    lastModified: "2 days ago",
    questions: [],
    responses: [],
    completionRate: 10,
  },
];

export default function MainPanel({
  setShowTemplateModal,
}: {
  setShowTemplateModal: (value: boolean) => void;
}) {
  const user = useAtomValue(userAtom);
  const isAdmin = useMemo(() => user && user.role === "admin", [user]);
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

      {SURVEYS.map(({ projectId, name, project, lastModified }) => (
        <div
          key={name}
          className="flex w-full  justify-between border-b border-b-navBorder py-4 cursor-pointer hover:bg-green-100"
        >
          <div className="flex w-full justify-between px-2" items-center>
            <div className="flex gap-2 group">
              <SurevyIcon />
              <div className="flex flex-col gap-1 py-2">
                <h3 className="text-txtBlack text-sm font-medium">{name}</h3>
                <p className="text-xs text-txtPurple">
                  Linked to {project} . Last modified: {lastModified}
                </p>
              </div>
            </div>
            <Trash2 color="#25292D" className="mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
