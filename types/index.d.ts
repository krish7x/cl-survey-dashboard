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
  description: string;
  optionTypeId: number | string;
  optionTypeName?: string;
  optionsJson?: IOptionJson;
  isAdded?: boolean;
}

export interface ITemplateRequest {
  project: {
    id?: number;
  };
  templateName?: string;
  description?: string;
  templateJsonData?: Record<string, any>;
}

export interface ICreateModalDetails {
  title: string;
  description: string;
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
