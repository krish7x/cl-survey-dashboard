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
  id: string;
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

export interface IToast {
  type: 'success' | 'failure' | '';
  message: string;
}

export interface IConfirmation {
  show: boolean;
  alertText: string;
  acceptCtaText: string;
  rejectCtaText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAccept: (...value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Array<any>;
}

export interface ISurvey {
  id: string;
  projectId: string;
  surveyName: string;
  description: string;
  userId: number;
  template: ITemplate;
  surveyJsonData?: SurveyJsonData;
  createdAt: string;
  updatedAt: string;
  project: Project;
  template?: null;
  updatedAt: string;
  lastModifiedHours: string;
}
export interface SurveyJsonData {
  [key: string]: string | number | object;
}
export interface Project {
  id: string;
  projectName: string;
  userId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITemplate {
  id: string;
  projectId: number;
  templateName: string;
  description: string;
  templateJsonData?: ITemplateQuestion[];
  createdAt: string;
  updatedAt: string;
  surveys?: ISurvey[];
  project?: IProject;
  updatedAt: string;
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
  projectId?: string;
  templateName?: string;
  description?: string;
  templateJsonData?: ITemplateQuestion[];
}

export interface ICreateModalDetails {
  title: string;
  description: string;
  option: IOptions;
  projectId: string;
  templateId?: string;
}

export interface ISurveyModalDetails {
  title: string;
  description: string;
  projectId: string;
  templateId?: string;
}

export interface ISurveyRequest {
  projectId?: string;
  surveyName: string;
  description: string;
  templateId?: string;
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
  surveyId: string;
  metaData: string;
}

export interface ILinkDetails {
  questionId: number;
  optionId: number;
}

export interface IActiveSurveyCharts {
  id: string;
  surveyName: string;
}

export interface Contact {
  id: number;
  name: string;
  emailId: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
