import { IOptions, ITemplate } from '..';

export interface ITemplateCreateModal {
  isTemplateEdit: boolean;
  showModal: boolean;
  title: string;
  description: string;
  option: IOptions;
  currentTemplates?: ITemplate[];
  currentProject?: IProject;
  projects: IOptions[];
  templateId?: string;
  setShowModal: (value: boolean) => void;
  setTemplateDetails: (value: object) => void;
  onClickCreate: () => void;
  resetForCreateTemplate: () => void;
}
