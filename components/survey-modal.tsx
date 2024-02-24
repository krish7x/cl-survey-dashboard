"use client";

import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { IOptions } from "@/types";

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
    template: {},
  });

  const [projects, setProjects] = useState<IOptions[]>([]);
  const [templates, setTemplates] = useState<IOptions[]>([]);

  useEffect(() => {
    axiosInstance.get("/projects/get").then((res) => {
      setProjects(res.data);
    });
    setTemplates([
      { id: 1, name: "temp1" },
      { id: 2, name: "temp2" },
    ]);
  }, []);

  const handleChangeText = (key: any, val: any) => {
    setSurveyData((state) => ({ ...state, [key]: val }));
  };

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
              <Label htmlFor="title" value="Surevy title" />
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="title.."
              value={surveyData.title}
              required
              onChange={(e) => handleChangeText("title", e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              placeholder="description.."
              value={surveyData.description}
              onChange={(e) => handleChangeText("description", e.target.value)}
              required
            />
          </div>

          <div>
            <div className="block my-2">
              <Label htmlFor="project" value="Select Project" />
            </div>
            <select
              id="small"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <div>
            <div className="block my-2">
              <Label htmlFor="template" value="Select Template" />
            </div>
            <select
              id="small"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <div className="w-full">
            <Button style={{}} onClick={onClickCreate}>
              Create
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
