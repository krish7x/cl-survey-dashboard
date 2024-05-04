import { IOptions, IProject, ISurveyModalDetails, ITemplate } from '..';

export interface ISurveyModal {
  showSurveyModal: boolean;
  createSurveyLoading: boolean;
  disableCreateButton: boolean;
  surveyDetails: ISurveyModalDetails;
  projects: IOptions[];
  currentProject?: IProject;
  currentTemplates?: ITemplate[];
  setSurveyDetails: (value: Partial<ISurveyModalDetails>) => void;
  setshowSurveyModal: (value: boolean) => void;
  onClickCreate: () => void;
  resetForCreateSurvey: () => void;
}
