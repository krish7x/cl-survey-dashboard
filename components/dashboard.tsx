import { useEffect, useReducer, useState } from "react";
import Sidebar from "./sidebar";
import ProjectModal from "./project-modal";
import { axiosInstance } from "@/utils/axios";
import { IProject } from "@/types";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/atom";
import MainPanel from "./main-panel";

interface IProjectDetails {
  title: string;
  description: string;
}

export default function Dashboard() {
  const user = useAtomValue(userAtom);

  const [showProjectModal, setSetshowProjectModal] = useState<boolean>(false);
  const [projectDetails, setProjectDetails] = useReducer(
    (state: IProjectDetails, diff: Partial<IProjectDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      title: "",
      description: "",
    }
  );
  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);

  useEffect(() => {
    axiosInstance.get(`/projects/get`).then((res) => {
      setProjects(res.data);
      setCurrentProject(res.data[0]);
    });
  }, [showProjectModal]);

  const onClickProjectCreate = () => {
    const reqBody = {
      projectName: projectDetails.title,
      description: projectDetails.description,
      userId: user?.id,
    };
    axiosInstance.post("/projects/create", reqBody).then((res) => {
      setSetshowProjectModal(false);
    });
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      <Sidebar
        setShowModal={setSetshowProjectModal}
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
      <ProjectModal
        showProjectModal={showProjectModal}
        setSetshowProjectModal={setSetshowProjectModal}
        title={projectDetails.title}
        description={projectDetails.description}
        setProjectDetails={setProjectDetails}
        onClickCreate={onClickProjectCreate}
      />
      <MainPanel />
    </div>
  );
}
