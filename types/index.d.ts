export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
  googleUserName: string;
  googleUserEmail: string;
  googleUserImage: string;
  googleUserExpiry: string;
}

export interface IGoogleUser {
  name: string;
  email: string;
  image: string;
  expires: string;
}

export interface IProject {
  id: number;
  projectName: string;
  userId: number;
  templates: ITemplate[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOptions {
  id: number | string;
  name: string;
  linkedTo?: number | string;
}

export interface ISurvey {
  id: number;
  projectId: number;
  surveyName: string;
  description: string;
  userId: number;
  template: ITemplate;
  surveyJsonData?: SurveyJsonData;
  createdAt: string;
  updatedAt: string;
  project: Project;
  template?: null;
  lastModifiedDate: string;
  lastModifiedHours: string;
}
export interface SurveyJsonData {
  [key: string]: string | number | object;
}
export interface Project {
  id: number;
  projectName: string;
  userId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITemplate {
  id: number;
  projectId: number;
  templateName: string;
  description: string;
  templateJsonData?: ITemplateQuestion[];
  createdAt: string;
  updatedAt: string;
  surveys?: ISurvey[];
  project?: IProject;
  lastModifiedDate: string;
  lastModifiedHours: string;
}

export interface IOptionJson {
  optionPosition: string;
  options: IOptions[];
}

export interface ITemplateQuestion {
  title: string;
  questionId?: number;
  description: string;
  optionTypeId: number | string;
  optionTypeName?: string;
  optionsJson?: IOptionJson;
  isAdded?: boolean;
  rating?: number;
  answer?: number[];
}

export interface ITemplateRequest {
  project: {
    id?: number;
  };
  id?: number;
  templateName?: string;
  description?: string;
  templateJsonData?: ITemplateQuestion[];
}

export interface ICreateModalDetails {
  title: string;
  description: string;
  option: IOptions;
  projectId: number | null;
  templateId?: number;
}

export interface ISurveyModalDetails {
  title: string;
  description: string;
  projectId: number | null;
  templateId?: number;
}

export interface ISurveyRequest {
  project: {
    id?: number;
  };
  surveyName: string;
  description: string;
  userId?: number;
  template: {
    id?: number;
  };
  surveyJsonData: SurveyJsonData;
}

export interface ISurveyPage {
  id: number;
  contactId: number;
  contactEmailId: string;
  surveyUrl: string;
  uuid: string;
  metaData: string;
  isEmailSent: boolean;
  createdAt: string;
  updatedAt: string;
  survey: Survey;
}
export interface Survey {
  id: number;
  surveyName: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  project: Project;
  template: Template;
}
export interface Project {
  id: number;
  projectName: string;
  userId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface Template {
  id: number;
  templateName: string;
  description: string;
  templateJsonData?: ITemplateQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface ISendSurveyDetails {
  contactName: string;
  contactEmailId: string;
  phone?: number;
  survey: {
    id: number;
  };
  metaData: string;
}

export interface ILinkDetails {
  questionId: number;
  optionId: number;
}

export interface IActiveSurveyCharts {
  id: number;
  surveyName: string;
}

export interface IFetchSurvey {
  id: number;
  contactId: number;
  contactEmailId: string;
  surveyUrl: string;
  uuid: string;
  metaData: string;
  isEmailSent: boolean;
  isSurveyCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  project: Project;
  template: Template;
  contact: Contact;
}

export interface Contact {
  id: number;
  name: string;
  emailId: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
