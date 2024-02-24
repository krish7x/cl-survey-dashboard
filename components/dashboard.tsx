import { useCallback, useEffect, useReducer, useState } from "react";
import Sidebar from "./sidebar";
import ProjectModal from "./project-modal";
import { axiosInstance } from "@/utils/axios";
import { IProject, ISurvey, ITemplateRequest } from "@/types";
import { useAtom, useAtomValue } from "jotai";
import { templateQuestionsAtom, userAtom } from "@/store/atom";
import MainPanel from "./main-panel";
import TemplateModal from "./template-modal";
import { AxiosError } from "axios";
import TemplateCreateModal from "./template-create-modal";

interface ICreateModalDetails {
  title: string;
  description: string;
}

export default function Dashboard() {
  const user = useAtomValue(userAtom);
  const [template, setTemplate] = useAtom(templateQuestionsAtom);
  const [showProjectModal, setSetshowProjectModal] = useState<boolean>(false);
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [showTemplateCreateModal, setShowTemplateCreateModal] = useState(false);
  const [projectDetails, setProjectDetails] = useReducer(
    (state: ICreateModalDetails, diff: Partial<ICreateModalDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      title: "",
      description: "",
    }
  );
  const [templateDetails, setTemplateDetails] = useReducer(
    (state: ICreateModalDetails, diff: Partial<ICreateModalDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      title: "",
      description: "",
    }
  );

  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentProject, setCurrentProject] = useState<IProject>();
  const [surveys, setSurveys] = useState<ISurvey[]>([]);

  useEffect(() => {
    axiosInstance.get(`/projects/get`).then((res) => {
      setProjects(res.data);
      setCurrentProject(res.data[0]);
    });
  }, [showProjectModal]);

  useEffect(() => {
    if (currentProject?.id) {
      axiosInstance
        .get(`/surveys/get?projectId=${currentProject?.id}`)
        .then((res) => {
          setSurveys([]);
          setSurveys(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setSurveys([]);
          }
        });
    }
  }, [currentProject]);

  const onClickProjectCreate = useCallback(() => {
    const reqBody = {
      projectName: projectDetails.title,
      description: projectDetails.description,
      userId: user?.id,
    };
    axiosInstance.post("/projects/create", reqBody).then((res) => {
      setSetshowProjectModal(false);
    });
  }, [projectDetails.description, projectDetails.title, user?.id]);

  const onClickDeleteSurvey = useCallback(
    (id: number) => {
      axiosInstance.delete(`/surveys/delete/${id}`).then(() => {
        const arr = [...surveys];
        const index = arr.findIndex((val) => val.id === id);
        arr.splice(index, 1);
        setSurveys(arr);
      });
    },
    [surveys]
  );

  const onClickTemplateCreate = useCallback(() => {
    const reqObj: ITemplateRequest = {
      projectId: currentProject?.id,
      templateName: templateDetails?.title,
      description: templateDetails?.description,
      templateJsonData: template,
    };
    axiosInstance.post("/templates/create", reqObj).then(() => {
      setTemplate([]);
      setTemplateDetails({ title: "", description: "" });
      setShowTemplateCreateModal(false);
      setShowTemplateModal(false);
    });
  }, [currentProject?.id, templateDetails?.title, templateDetails?.description, template, setTemplate]);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <Sidebar
        setShowModal={setSetshowProjectModal}
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
      <ProjectModal
        showModal={showProjectModal}
        setShowModal={setSetshowProjectModal}
        title={projectDetails.title}
        description={projectDetails.description}
        setProjectDetails={setProjectDetails}
        onClickCreate={onClickProjectCreate}
      />
      <TemplateModal
        showModal={showTemplateModal}
        setShowModal={setShowTemplateModal}
        setShowCreateModal={setShowTemplateCreateModal}
      />
      <TemplateCreateModal
        showModal={showTemplateCreateModal}
        setShowModal={setShowTemplateCreateModal}
        title={templateDetails.title}
        description={templateDetails.description}
        setTemplateDetails={setTemplateDetails}
        onClickCreate={onClickTemplateCreate}
      />
      <MainPanel
        surveys={surveys}
        onClickDeleteSurvey={onClickDeleteSurvey}
        setShowTemplateModal={setShowTemplateModal}
      />
    </div>
  );
}
