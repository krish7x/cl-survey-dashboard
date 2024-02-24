'use client';

import {
  Button,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import Dropdown from "./dropdown";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { ITemplate } from "@/types";

export default function SurveyModal({
  showSurveyModal,
  setshowSurveyModal,
  onClickCreate,
}: {
  showSurveyModal: boolean;
  setshowSurveyModal: any;
  onClickCreate: () => void;
}) {

  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    project: {},
    template: {}
  })

  const [projects, setProjects] = useState([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  useEffect(() => {
    axiosInstance.get('/projects/get').then((res) => {
      setProjects(res.data);
    });
    setTemplates([{id: 1, name: "temp1"}, {id: 2, name: "temp2"}])
  },[]);

  const handleChangeText = (key: any, val: any) => {
    setSurveyData((state) => ({...state,[key]: val }))
  }

  return (
    <Modal
      show={showSurveyModal}
      size="lg"
      onClose={() => setshowSurveyModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Create New Survey
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="projectTitle" value="Project title" />
            </div>
            <TextInput
              id="surveyTitle"
              placeholder="title.."
              value={surveyData.title}
              required
              onChange={(e) => handleChangeText('title', e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="projectTitle" value="Description" />
            </div>
            <Textarea
              id="projectTitle"
              placeholder="description.."
              value={surveyData.description}
              onChange={(e) => handleChangeText('description', e.target.value)}
              required
            />
          </div>

          <div>
            <div className="block my-2">
              <Label htmlFor="project" value="Select Project" />
            </div>
            <Dropdown label = "Select project"
              options={projects}
              labelAttr = {'projectName'}/>
          </div>

          <div>
            <div className="block my-2">
              <Label htmlFor="template" value="Select Template" />
            </div>
            <Dropdown label = "Select template"
              options={templates}
              labelAttr = {'name'} />
          </div>

          <div className="w-full">
            <Button style={{}}
             onClick={onClickCreate}>Create</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
