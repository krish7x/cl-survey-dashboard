import { ISurvey, ITemplate } from '..';

export interface IMainPanel {
  surveys: ISurvey[];
  templates: ITemplate[];
  isSurveyLoaded: boolean;
  isTemplateLoaded: boolean;
  setShowTemplateModal: (value: boolean) => void;
  setShowSurveyModal: (value: boolean) => void;
  onClickSendSurvey: (id: string) => void;
  onClickShowCharts: (id: string, surveyName: string) => void;
  onClickViewSurvey: (id: string) => void;
  onClickEditTemplate: (id: string) => void;
  onClickDeleteSurvey: (id: string) => void;
  onClickDeleteTemplate: (id: string) => void;
  onClickShowSurveyContacts: (id: string) => void;
  resetForCreateSurvey: () => void;
  resetForCreateTemplate: () => void;
}
