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
