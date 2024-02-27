import { useCallback, useEffect, useReducer, useState } from "react";
import Sidebar from "./sidebar";
import ProjectModal from "./project-modal";
import { axiosInstance } from "@/utils/axios";
import {
  ICreateModalDetails,
  IProject,
  ISendSurveyDetails,
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
import SendSurveyModal from "./send-survey-modal";
import SurveyDataTable from "./survey-data-table";
import NPSAnalytics from "./nps-analytics";

export default function Dashboard() {
  const user = useAtomValue(userAtom);
  const tabs = useAtomValue(tabsAtom);
  const [template, setTemplate] = useAtom(templateQuestionsAtom);
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [showSurveyModal, setShowSurveyModal] = useState<boolean>(false);
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [showTemplateCreateModal, setShowTemplateCreateModal] = useState(false);
  const [showSurveyContacts, setShowSurveyContacts] = useState(false);
  const [showNPSAnalytics, setShowNPSAnalytics] = useState(false)
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

  const [sendSurveyDetails, setSendSurveyDetails] = useReducer(
    (state: ISendSurveyDetails, diff: Partial<ISendSurveyDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      contactName: "",
      contactEmailId: "",
      survey: {
        id: 0,
      },
      metaData: "",
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
  const [createSendSurveyLoading, setCreateSendSurveyLoading] = useState(false);
  const [disableSurveyCreateButton, setDisableSurveyCreateButton] =
    useState(false);
  const [disableTemplateCreateButton, setDisableTemplateCreateButton] =
    useState(false);
  const [createTemplateLoading, setCreateTemplateLoading] = useState(false);
  const [showSendSurveyModal, setShowSendSurveyModal] = useState(false);
  const [sendSurveyId, setSendSurveyId] = useState<number>(0);

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
    currentProject,
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
        id: surveyDetails?.templateId,
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
      arr.unshift({
        ...res.data,
        project: {
          id: currentProject?.id,
          projectName: currentProject?.projectName || "",
        },
      });
      setSurveys(arr);
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

  const onClickSendSurvey = useCallback((id: number) => {
    setShowSendSurveyModal(true);
    setSendSurveyId(id);
  }, []);

  const onClickShowSurveyContacts = (id: number) => {
    setShowSurveyContacts(true);
  };

  const onClickShowCharts = (id: number) => {
    setShowNPSAnalytics(true);
    console.log("Survey id", id);
  }

  const onSendSurvey = useCallback(() => {
    setCreateSendSurveyLoading(true);
    const reqObj: ISendSurveyDetails = {
      ...sendSurveyDetails,
      metaData: new Date().toLocaleString(),
      survey: {
        id: sendSurveyId,
      },
    };
    axiosInstance
      .post("/surveys/send", reqObj)
      .then((res) => {
        if (res.data) {
          setSendSurveyDetails({
            contactName: "",
            contactEmailId: "",
            survey: {
              id: 0,
            },
            metaData: "",
          });
          setShowSendSurveyModal(false);
          setCreateSendSurveyLoading(false);
        }
      })
      .catch(() => {
        setShowSendSurveyModal(false);
        setCreateSendSurveyLoading(false);
      });
  }, [sendSurveyDetails, sendSurveyId]);

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
        onClickSendSurvey={onClickSendSurvey}
        onClickShowCharts={onClickShowCharts}
        setShowSurveyModal={setShowSurveyModal}
        onClickShowSurveyContacts={onClickShowSurveyContacts}
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
        currentTemplates={currentTemplates}
        createSurveyLoading={createSurveyLoading}
        disableCreateButton={disableSurveyCreateButton}
        resetForCreateSurvey={resetForCreateSurvey}
      />
      <SendSurveyModal
        showSendSurveyModal={showSendSurveyModal}
        setShowSendSurveyModal={setShowSendSurveyModal}
        sendSurveyDetails={sendSurveyDetails}
        setSendSurveyDetails={setSendSurveyDetails}
        onSendSurvey={onSendSurvey}
        isProcessing={createSendSurveyLoading}
      />
      <TemplateModal
        showModal={showTemplateModal}
        setShowModal={setShowTemplateModal}
        setShowCreateModal={setShowTemplateCreateModal}
        disableCreateButton={disableTemplateCreateButton}
        resetForCreateTemplate={resetForCreateTemplate}
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
      <SurveyDataTable showModal = {showSurveyContacts}
          onClose={() => setShowSurveyContacts(false)} />
      <NPSAnalytics showModal={showNPSAnalytics}
        onClose={() => setShowNPSAnalytics(false)} 
        surveyName={'Caratlane NPS'}/>
    </div>
  );
}
