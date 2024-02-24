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

interface SurveyJsonData {
  [key: string]: string;
}

export interface ISurvey {
  id: number;
  projectId: number;
  surveyName: string;
  description: string;
  userId: number;
  templateId: number;
  surveyJsonData: object | null;
  createdAt: string;
  updatedAt: string;
}

export interface ITemplate {
  id: number,
  name: string
}
