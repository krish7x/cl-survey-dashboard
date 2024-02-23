"use client";

import { useEffect, useReducer, useState } from "react";
import Sidebar from "./sidebar";
import ProjectModal from "./project-modal";
import { axiosInstance } from "@/utils/axios";
import { IProject } from "@/types";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/atom";

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

  useEffect(() => {
    axiosInstance.get(`/projects/get`).then((res) => {
      setProjects(res.data);
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
    <div className="w-full h-full">
      <Sidebar setShowModal={setSetshowProjectModal} projects={projects} />
      <ProjectModal
        showProjectModal={showProjectModal}
        setSetshowProjectModal={setSetshowProjectModal}
        title={projectDetails.title}
        description={projectDetails.description}
        setProjectDetails={setProjectDetails}
        onClickCreate={onClickProjectCreate}
      />
    </div>
  );
}
