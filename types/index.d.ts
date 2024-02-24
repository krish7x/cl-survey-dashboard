export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
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
  templateId: number;
  surveyJsonData: SurveyJsonData;
  createdAt: string;
  updatedAt: string;
  project: Project;
  template?: null;
  lastModifiedDate: string;
  lastModifiedHours: string;
}
export interface SurveyJsonData {
  key15: string;
  key16: string;
}
export interface Project {
  id: number;
  projectName: string;
  userId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
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
  projectId?: number;
  templateName?: string;
  description?: string;
  templateJsonData?: Record<string, any>;
}
