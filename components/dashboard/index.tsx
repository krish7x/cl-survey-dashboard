import {
  tabsAtom,
  templateQuestionsAtom,
  toastAtom,
  userAtom,
} from '@/store/atom';
import {
  IActiveSurveyCharts,
  ICreateModalDetails,
  IProject,
  ISendSurveyDetails,
  ISurvey,
  ISurveyModalDetails,
  ISurveyRequest,
  ITemplate,
  ITemplateQuestion,
  ITemplateRequest,
} from '@/types';
import { axiosInstance } from '@/utils/axios';
import { AxiosError } from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useReducer, useState } from 'react';

import ToastComponent from '../micros/toast';
import ConfirmationModal from '../modals/confirmation-modal';
import ProjectModal from '../modals/project-modal';
import SendSurveyModal from '../modals/send-survey-modal';
import SurveyModal from '../modals/survey-modal';
import TemplateCreateModal from '../modals/template-create-modal';
import TemplateModal from '../modals/template-modal';
import NPSAnalytics from '../reports/nps-analytics';
import SurveyDataTable from '../reports/survey-data-table';
import MainPanel from './main-panel';
import Sidebar from './sidebar';

export default function Dashboard() {
  //atoms
  const user = useAtomValue(userAtom);
  const tabs = useAtomValue(tabsAtom);
  const [template, setTemplate] = useAtom(templateQuestionsAtom);
  const [toast, setToast] = useAtom(toastAtom);

  //states
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [showSurveyModal, setShowSurveyModal] = useState<boolean>(false);
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [showTemplateCreateModal, setShowTemplateCreateModal] = useState(false);
  const [showSurveyContacts, setShowSurveyContacts] = useState(false);
  const [showNPSAnalytics, setShowNPSAnalytics] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentProject, setCurrentProject] = useState<IProject>();
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [currentTemplates, setCurrentTemplates] = useState<ITemplate[]>([]);
  const [modalTemplates, setModalTemplates] = useState<ITemplate[]>([]);
  const [isSurveyLoaded, setIsSurveyLoaded] = useState(false);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);
  const [createProjectLoading, setCreateProjectLoading] = useState(false);
  const [createSurveyLoading, setCreateSurveyLoading] = useState(false);
  const [createSendSurveyLoading, setCreateSendSurveyLoading] = useState(false);
  const [disableSurveyCreateButton, setDisableSurveyCreateButton] =
    useState(false);
  const [showUpdateTemplate, setShowUpdateTemplate] = useState(false);
  const [createTemplateLoading, setCreateTemplateLoading] = useState(false);
  const [showSendSurveyModal, setShowSendSurveyModal] = useState(false);
  const [sendSurveyId, setSendSurveyId] = useState<string>('');
  const [activeSurveyCharts, setActiveSurveyCharts] =
    useState<IActiveSurveyCharts>();

  //reducers
  const [projectDetails, setProjectDetails] = useReducer(
    (state: ICreateModalDetails, diff: Partial<ICreateModalDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      title: '',
      description: '',
      option: {
        id: 0,
        name: '',
      },
      projectId: '',
      templateId: '',
    },
  );
  const [templateDetails, setTemplateDetails] = useReducer(
    (state: ICreateModalDetails, diff: Partial<ICreateModalDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      title: '',
      description: '',
      option: {
        id: 1,
        name: '',
      },
      projectId: '',
      templateId: '',
    },
  );
  const [surveyDetails, setSurveyDetails] = useReducer(
    (state: ISurveyModalDetails, diff: Partial<ISurveyModalDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      title: '',
      description: '',
      projectId: '',
      templateId: '',
    },
  );

  const [sendSurveyDetails, setSendSurveyDetails] = useReducer(
    (state: ISendSurveyDetails, diff: Partial<ISendSurveyDetails>) => ({
      ...state,
      ...diff,
    }),
    {
      contactName: '',
      contactEmailId: '',
      surveyId: '',
      metaData: '',
    },
  );

  //to pre-populate all the projects
  useEffect(() => {
    axiosInstance.get(`/projects`).then(res => {
      setProjects(res.data);
      setCurrentProject(res.data[0]);
    });
  }, []);

  //to pre-populate all the templates
  useEffect(() => {
    if (currentProject?.id) {
      axiosInstance
        .get(`/templates`)
        .then(res => {
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

  //to get surveys for certain project id - survey tab
  useEffect(() => {
    if (currentProject?.id) {
      axiosInstance
        .get(`/surveys?projectId=${currentProject?.id}`)
        .then(res => {
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
  }, [currentProject]);

  //to get templates for certain project id - templates tab
  useEffect(() => {
    if (currentProject?.id && tabs.id === 2) {
      axiosInstance
        .get(`/templates?projectId=${currentProject?.id}`)
        .then(res => {
          setCurrentTemplates([]);
          setModalTemplates(res.data);
          setCurrentTemplates(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setCurrentTemplates([]);
          }
        });
    }
  }, [currentProject, tabs, tabs.id]);

  //to get templates for certain project id - create survey modal
  useEffect(() => {
    if (surveyDetails?.projectId && showSurveyModal) {
      axiosInstance
        .get(`/templates?projectId=${surveyDetails?.projectId}`)
        .then(res => {
          setModalTemplates([]);
          setModalTemplates(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setModalTemplates([]);
          }
        });
    }
  }, [surveyDetails, showSurveyModal, currentProject]);

  //to get templates for certain project id - create template modal
  useEffect(() => {
    if (templateDetails?.projectId && showTemplateCreateModal) {
      axiosInstance
        .get(`/templates?projectId=${templateDetails?.projectId}`)
        .then(res => {
          setModalTemplates([]);
          setModalTemplates(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            setModalTemplates([]);
          }
        });
    }
  }, [templateDetails, showTemplateCreateModal, currentProject, tabs]);

  //creation callback
  const onClickProjectCreate = useCallback(() => {
    setCreateProjectLoading(true);
    const reqBody = {
      projectName: projectDetails.title,
      description: projectDetails.description,
      userId: user?.id,
    };
    axiosInstance
      .post('/projects', reqBody)
      .then(res => {
        setToast({
          type: 'success',
          message: 'Project Created!',
        });
        setShowProjectModal(false);
        setProjects([res.data, ...projects]);
        setCurrentProject(res.data);
        setCreateProjectLoading(false);
        setProjectDetails({
          title: '',
          description: '',
        });
      })
      .catch(() => {
        setCreateProjectLoading(false);
        setShowProjectModal(false);
        setToast({
          type: 'failure',
          message: `Error while creating project - Project name should be unique`,
        });
      });
  }, [
    projectDetails.description,
    projectDetails.title,
    projects,
    setToast,
    user?.id,
  ]);

  const onClickTemplateCreateOrUpdate = useCallback(() => {
    setCreateTemplateLoading(true);
    const reqObj: ITemplateRequest = {
      projectId: currentProject?.id,
      templateName: templateDetails?.title,
      description: templateDetails?.description,
      templateJsonData: template.map((val, inx) => ({
        ...val,
        questionId: inx + 1,
        isAdded: true,
      })),
    };
    let instance = null;
    if (showUpdateTemplate) {
      instance = axiosInstance.put(
        `/templates/${templateDetails?.templateId}`,
        reqObj,
      );
    } else {
      instance = axiosInstance.post('/templates', reqObj);
    }
    instance
      .then(res => {
        if (!showUpdateTemplate) {
          setTemplates([...templates, res.data]);
          setCurrentTemplates([...currentTemplates, res.data]);
          setToast({
            type: 'success',
            message: 'Template Created!',
          });
        } else {
          setTemplates([...templates, res.data?.data]);
          setCurrentTemplates([...currentTemplates, res.data?.data]);
          setToast({
            type: 'success',
            message: 'Template Updated!',
          });
        }
        setTemplate([]);
        setTemplateDetails({ title: '', description: '' });
        setShowTemplateCreateModal(false);
        setShowTemplateModal(false);
        setCreateTemplateLoading(false);
      })
      .catch(() => {
        setCreateTemplateLoading(false);
        setShowTemplateCreateModal(false);
        setShowTemplateModal(false);
        setToast({
          type: 'failure',
          message: `Error while creating template - Template name should be unique`,
        });
      });
  }, [
    currentProject?.id,
    templateDetails?.title,
    templateDetails?.description,
    templateDetails?.templateId,
    template,
    showUpdateTemplate,
    setTemplate,
    templates,
    currentTemplates,
    setToast,
  ]);

  const onClickSurveyCreate = useCallback(() => {
    setCreateSurveyLoading(true);
    const reqObj: ISurveyRequest = {
      projectId: currentProject?.id,
      surveyName: surveyDetails?.title,
      description: surveyDetails?.description,
      templateId: surveyDetails?.templateId,
    };
    axiosInstance
      .post('/surveys', reqObj)
      .then(res => {
        setSurveyDetails({
          title: '',
          description: '',
          projectId: '',
          templateId: '',
        });
        const arr = [...surveys];
        setToast({
          type: 'success',
          message: 'Survey Created!',
        });
        arr.unshift({
          ...res.data,
          project: {
            id: currentProject?.id,
            projectName: currentProject?.projectName || '',
          },
        });
        setSurveys(arr);
        setShowSurveyModal(false);
        setCreateSurveyLoading(false);
      })
      .catch(() => {
        setCreateSurveyLoading(false);
        setShowSurveyModal(false);
        setToast({
          type: 'failure',
          message: `Error while creating survey - Survey name should be unique`,
        });
      });
  }, [
    currentProject?.id,
    currentProject?.projectName,
    setToast,
    surveyDetails?.description,
    surveyDetails?.templateId,
    surveyDetails?.title,
    surveys,
  ]);

  //viewing callback
  const onClickViewSurvey = useCallback(
    (id: string) => {
      const survey = surveys.find(val => val.id === id);
      setDisableSurveyCreateButton(true);
      setSurveyDetails({
        title: survey?.surveyName,
        description: survey?.description,
        projectId: survey?.project?.id,
        templateId: survey?.template?.id,
      });
      setShowSurveyModal(true);
    },
    [surveys],
  );

  const onClickEditTemplate = useCallback(
    (id: string) => {
      const template = templates.find(val => val.id === id);
      setShowUpdateTemplate(true);
      setTemplateDetails({
        templateId: id,
        title: template?.templateName,
        description: template?.description,
      });
      setTemplate(template?.templateJsonData as ITemplateQuestion[]);
      setShowTemplateCreateModal(true);
    },
    [setTemplate, templates],
  );

  const onClickShowSurveyContacts = () => {
    setShowSurveyContacts(true);
  };

  const onClickShowCharts = useCallback((id: string, surveyName: string) => {
    setActiveSurveyCharts({
      id: id,
      surveyName: surveyName,
    });
    setShowNPSAnalytics(true);
  }, []);

  const prefillAndShowTemplateModal = useCallback(() => {
    setShowTemplateCreateModal(false);
    if (!templateDetails?.templateId) {
      setShowTemplateModal(true);
    } else {
      const template = templates.find(
        val => val.id === templateDetails?.templateId,
      );
      setTemplate(template?.templateJsonData as ITemplateQuestion[]);
      setShowTemplateModal(true);
    }
  }, [setTemplate, templateDetails?.templateId, templates]);

  //delete callback
  const onClickDeleteProject = useCallback(
    (id: string) => {
      axiosInstance
        .delete(`/projects/${id}`)
        .then(() => {
          setToast({
            type: 'success',
            message: 'Project Deleted!',
          });
          const arr = [...projects];
          const index = arr.findIndex(val => val.id === id);
          arr.splice(index, 1);
          setProjects(arr);
          setCurrentProject(arr[0]);
        })
        .catch(err => {
          setToast({
            type: 'failure',
            message: `Error while deleting project - ${err}`,
          });
        });
    },
    [projects, setToast],
  );

  const onClickDeleteTemplate = useCallback(
    (id: string) => {
      axiosInstance
        .delete(`/templates/${id}`)
        .then(() => {
          setToast({
            type: 'success',
            message: 'Template Deleted!',
          });
          const arr = [...templates];
          const index = arr.findIndex(val => val.id === id);
          arr.splice(index, 1);
          setTemplates(arr);
          const arr2 = [...currentTemplates];
          const index2 = arr2.findIndex(val => val.id === id);
          arr2.splice(index2, 1);
          setCurrentTemplates(arr2);
        })
        .catch(err => {
          setToast({
            type: 'failure',
            message: `Error while deleting templete - ${err}`,
          });
        });
    },
    [currentTemplates, setToast, templates],
  );

  const onClickDeleteSurvey = useCallback(
    (id: string) => {
      axiosInstance
        .delete(`/surveys/${id}`)
        .then(() => {
          setToast({
            type: 'success',
            message: 'Survey Deleted!',
          });
          const arr = [...surveys];
          const index = arr.findIndex(val => val.id === id);
          arr.splice(index, 1);
          setSurveys(arr);
        })
        .catch(err => {
          setToast({
            type: 'failure',
            message: `Error while deleting survey - ${err}`,
          });
        });
    },
    [setToast, surveys],
  );

  //send callback
  const onClickSendSurvey = useCallback((id: string) => {
    setShowSendSurveyModal(true);
    setSendSurveyId(id);
  }, []);

  const onSendSurvey = useCallback(() => {
    setCreateSendSurveyLoading(true);
    const reqObj: ISendSurveyDetails = {
      ...sendSurveyDetails,
      metaData: new Date().toLocaleString(),
      surveyId: sendSurveyId,
    };
    axiosInstance
      .post('/surveys/send', reqObj)
      .then(res => {
        if (res.data) {
          setSendSurveyDetails({
            contactName: '',
            contactEmailId: '',
            surveyId: '',
            metaData: '',
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

  //reset callback
  const resetForCreateSurvey = useCallback(() => {
    setSurveyDetails({
      title: '',
      description: '',
      projectId: '',
      templateId: '',
    });
    setDisableSurveyCreateButton(false);
  }, [setSurveyDetails]);

  const resetForCreateTemplate = useCallback(() => {
    setTemplate([]);
    setTemplateDetails({
      title: '',
      description: '',
      option: {
        id: 1,
        name: '',
      },
      projectId: '',
      templateId: '',
    });
    setShowUpdateTemplate(false);
  }, [setTemplate]);

  return (
    <div className="flex h-full w-full overflow-hidden">
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
        onClickEditTemplate={onClickEditTemplate}
        onClickDeleteTemplate={onClickDeleteTemplate}
        setShowTemplateModal={setShowTemplateCreateModal}
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
        projects={projects.map(val => ({
          id: val.id,
          name: val.projectName,
        }))}
        currentProject={currentProject}
        currentTemplates={modalTemplates}
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
        setShowTemplateCreateModal={setShowTemplateCreateModal}
        isTemplateEdit={showUpdateTemplate}
        resetForCreateTemplate={resetForCreateTemplate}
        onClickCreateOrUpdate={onClickTemplateCreateOrUpdate}
        createTemplateLoading={createTemplateLoading}
      />
      <TemplateCreateModal
        isTemplateEdit={showUpdateTemplate}
        showModal={showTemplateCreateModal}
        setShowModal={setShowTemplateCreateModal}
        setTemplateDetails={setTemplateDetails}
        onClickCreate={prefillAndShowTemplateModal}
        projects={projects.map(val => ({
          id: val.id,
          name: val.projectName,
        }))}
        currentTemplates={modalTemplates}
        currentProject={currentProject}
        resetForCreateTemplate={resetForCreateTemplate}
        {...templateDetails}
      />
      <SurveyDataTable
        showModal={showSurveyContacts}
        onClose={() => setShowSurveyContacts(false)}
      />
      <NPSAnalytics
        showModal={showNPSAnalytics}
        onClose={() => setShowNPSAnalytics(false)}
        surveyName={
          activeSurveyCharts?.surveyName
            ? activeSurveyCharts.surveyName
            : 'Caratlane NPS'
        }
      />

      {toast.message.length ? (
        <div className="absolute bottom-10 right-6">
          <ToastComponent
            toast={toast}
            setToast={setToast}
          />
        </div>
      ) : null}

      <ConfirmationModal />
    </div>
  );
}
