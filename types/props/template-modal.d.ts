export interface ITemplateModal {
  showModal: boolean;
  isTemplateEdit: boolean;
  createTemplateLoading: boolean;
  onClickCreateOrUpdate: () => void;
  setShowModal: (value: boolean) => void;
  setShowTemplateCreateModal: (value: boolean) => void;
  resetForCreateTemplate: () => void;
}
