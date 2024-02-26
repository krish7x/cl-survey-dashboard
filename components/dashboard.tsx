import { useCallback, useEffect, useReducer, useState } from "react";
import Sidebar from "./sidebar";
import ProjectModal from "./project-modal";
import { axiosInstance } from "@/utils/axios";
import {
  ICreateModalDetails,
  IProject,
  ISurvey,
  ISurveyModalDetails,
  ISurveyRequest,
  ITemplate,
  ITemplateQuestion,
  ITemplateRequest,
} from "@/types";
import { useAtom, useAtomValue } from "jotai";
import { tabsAtom, templateQuestionsAtom, userAtom } from "@/store/atom";
import MainPanel from "./main-panel";
import TemplateModal from "./template-modal";
import { AxiosError } from "axios";
import TemplateCreateModal from "./template-create-modal";
import SurveyModal from "./survey-modal";

export default function Dashboard() {
  const user = useAtomValue(userAtom);
  const tabs = useAtomValue(tabsAtom);
  const [template, setTemplate] = useAtom(templateQuestionsAtom);
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [showSurveyModal, setShowSurveyModal] = useState<boolean>(false);
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
  const [surveyDetails, setSurveyDetails] = useReducer(
    (state: ISurveyModalDetails, diff: Partial<ISurveyModalDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      title: "",
      description: "",
      projectId: 0,
      templateId: 0,
    }
  );

  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentProject, setCurrentProject] = useState<IProject>();
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [currentTemplates, setCurrentTemplates] = useState<ITemplate[]>([]);
  const [isSurveyLoaded, setIsSurveyLoaded] = useState(false);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);
  const [createProjectLoading, setCreateProjectLoading] = useState(false);
  const [createSurveyLoading, setCreateSurveyLoading] = useState(false);
  const [disableSurveyCreateButton, setDisableSurveyCreateButton] =
    useState(false);
  const [disableTemplateCreateButton, setDisableTemplateCreateButton] =
    useState(false);
  const [createTemplateLoading, setCreateTemplateLoading] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/projects/get`).then((res) => {
      setProjects(res.data);
      setCurrentProject(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (currentProject?.id) {
      axiosInstance
        .get(`/templates/get`)
        .then((res) => {
          setTemplates(res.data);
          setSurveyDetails({
            projectId: currentProject?.id,
          });
          setIsTemplateLoaded(true);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setIsTemplateLoaded(true);
          }
        });
    }
  }, [currentProject?.id]);

  useEffect(() => {
    if (currentProject?.id && tabs.id === 1) {
      axiosInstance
        .get(`/surveys/get?project.id=${currentProject?.id}`)
        .then((res) => {
          setSurveys([]);
          setIsSurveyLoaded(true);
          setSurveys(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setIsSurveyLoaded(true);
            setSurveys([]);
          }
        });
    }
  }, [currentProject, tabs.id]);

  useEffect(() => {
    if (currentProject?.id && tabs.id === 2) {
      axiosInstance
        .get(`/templates/get?project.id=${currentProject?.id}`)
        .then((res) => {
          setCurrentTemplates([]);
          setCurrentTemplates(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setCurrentTemplates([]);
          }
        });
    }
  }, [currentProject, tabs.id]);

  const onClickProjectCreate = useCallback(() => {
    setCreateProjectLoading(true);
    const reqBody = {
      projectName: projectDetails.title,
      description: projectDetails.description,
      userId: user?.id,
    };
    axiosInstance.post("/projects/create", reqBody).then((res) => {
      setShowProjectModal(false);
      setProjects([res.data, ...projects]);
      setCurrentProject(res.data);
      setCreateProjectLoading(false);
    });
  }, [projectDetails.description, projectDetails.title, projects, user?.id]);

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

  const onClickViewSurvey = useCallback(
    (id: number) => {
      const survey = surveys.find((val) => val.id === id);
      setDisableSurveyCreateButton(true);
      setSurveyDetails({
        title: survey?.surveyName,
        description: survey?.description,
        projectId: survey?.project?.id,
        templateId: survey?.template?.id,
      });
      setShowSurveyModal(true);
    },
    [surveys]
  );

  const onClickViewTemplate = useCallback(
    (id: number) => {
      const template = templates.find((val) => val.id === id);
      setDisableTemplateCreateButton(true);
      setTemplate(template?.templateJsonData as ITemplateQuestion[]);
      setShowTemplateModal(true);
    },
    [setTemplate, templates]
  );

  const onClickDeleteTemplate = useCallback(
    (id: number) => {
      axiosInstance.delete(`/templates/delete/${id}`).then(() => {
        const arr = [...templates];
        const index = arr.findIndex((val) => val.id === id);
        arr.splice(index, 1);
        setTemplates(arr);

        const arr2 = [...currentTemplates];
        const index2 = arr2.findIndex((val) => val.id === id);
        arr2.splice(index2, 1);
        setCurrentTemplates(arr2);
      });
    },
    [currentTemplates, templates]
  );

  const onClickDeleteProject = useCallback(
    (id: number) => {
      axiosInstance.delete(`/projects/delete/${id}`).then(() => {
        const arr = [...projects];
        const index = arr.findIndex((val) => val.id === id);
        arr.splice(index, 1);
        setProjects(arr);
        setCurrentProject(arr[0]);
      });
    },
    [projects]
  );

  const onClickTemplateCreate = useCallback(() => {
    setCreateTemplateLoading(true);
    const reqObj: ITemplateRequest = {
      project: {
        id: currentProject?.id,
      },
      templateName: templateDetails?.title,
      description: templateDetails?.description,
      templateJsonData: template,
    };
    axiosInstance.post("/templates/create", reqObj).then((res) => {
      setTemplates([...templates, res.data]);
      setCurrentTemplates([...currentTemplates, res.data]);
      setTemplate([]);
      setTemplateDetails({ title: "", description: "" });
      setShowTemplateCreateModal(false);
      setShowTemplateModal(false);
      setCreateTemplateLoading(false);
    });
  }, [
    currentProject?.id,
    templateDetails?.title,
    templateDetails?.description,
    template,
    templates,
    currentTemplates,
    setTemplate,
  ]);

  const onClickSurveyCreate = useCallback(() => {
    setCreateSurveyLoading(true);
    const reqObj: ISurveyRequest = {
      project: {
        id: currentProject?.id,
      },
      surveyName: surveyDetails?.title,
      description: surveyDetails?.description,
      userId: user?.id,
      template: {
        id: surveyDetails?.templateId
      },
      surveyJsonData: {},
    };
    axiosInstance.post("/surveys/create", reqObj).then((res) => {
      setSurveyDetails({
        title: "",
        description: "",
        projectId: 0,
        templateId: 0,
      });
      const arr = [...surveys];
      arr.push({
        ...res.data,
        project: {
          id: currentProject?.id,
          projectName: currentProject?.projectName || "",
        },
      });
      setShowSurveyModal(false);
      setCreateSurveyLoading(false);
    });
  }, [
    currentProject?.id,
    currentProject?.projectName,
    surveyDetails?.description,
    surveyDetails?.templateId,
    surveyDetails?.title,
    surveys,
    user?.id,
  ]);

  const resetForCreateSurvey = useCallback(() => {
    setSurveyDetails({
      title: "",
      description: "",
      projectId: null,
      templateId: 0,
    });
    setDisableSurveyCreateButton(false);
  }, [setSurveyDetails]);

  const resetForCreateTemplate = useCallback(() => {
    setTemplate([]);
    setDisableTemplateCreateButton(false);
  }, [setTemplate]);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <Sidebar
        setShowModal={setShowProjectModal}
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        onDeleteProject={onClickDeleteProject}
      />
      <MainPanel
        surveys={surveys}
        templates={currentTemplates}
        onClickDeleteSurvey={onClickDeleteSurvey}
        onClickViewSurvey={onClickViewSurvey}
        onClickViewTemplate={onClickViewTemplate}
        onClickDeleteTemplate={onClickDeleteTemplate}
        setShowTemplateModal={setShowTemplateModal}
        setShowSurveyModal={setShowSurveyModal}
        isSurveyLoaded={isSurveyLoaded}
        isTemplateLoaded={isTemplateLoaded}
        resetForCreateSurvey={resetForCreateSurvey}
        resetForCreateTemplate={resetForCreateTemplate}
      />

      {/* modals goes here */}
      <ProjectModal
        createProjectLoading={createProjectLoading}
        showModal={showProjectModal}
        setShowModal={setShowProjectModal}
        title={projectDetails.title}
        description={projectDetails.description}
        setProjectDetails={setProjectDetails}
        onClickCreate={onClickProjectCreate}
      />
      <TemplateModal
        showModal={showTemplateModal}
        setShowModal={setShowTemplateModal}
        setShowCreateModal={setShowTemplateCreateModal}
        disableCreateButton={disableTemplateCreateButton}
        resetForCreateTemplate={resetForCreateTemplate}
      />
      <SurveyModal
        showSurveyModal={showSurveyModal}
        setshowSurveyModal={setShowSurveyModal}
        onClickCreate={onClickSurveyCreate}
        surveyDetails={surveyDetails}
        setSurveyDetails={setSurveyDetails}
        projects={projects.map((val) => ({
          id: val.id,
          name: val.projectName,
        }))}
        currentProject={currentProject}
        createSurveyLoading={createSurveyLoading}
        disableCreateButton={disableSurveyCreateButton}
        resetForCreateSurvey={resetForCreateSurvey}
      />
      <TemplateCreateModal
        showModal={showTemplateCreateModal}
        setShowModal={setShowTemplateCreateModal}
        title={templateDetails.title}
        description={templateDetails.description}
        setTemplateDetails={setTemplateDetails}
        onClickCreate={onClickTemplateCreate}
        createTemplateLoading={createTemplateLoading}
        disableCreateButton={disableTemplateCreateButton}
      />
    </div>
  );
}
