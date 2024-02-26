"use client";

import { Table, Button, Label, Modal, Tooltip } from "flowbite-react";
import { Mail } from "lucide-react";
import { surveyContactsData } from "@/utils/surveyJson";

export default function SurveyDataTable(props: {
  showModal: any;
  setShowModal: any;
}) {
  const { showModal, setShowModal } = props;
  return (
    <Modal
      size="7xl"
      show={showModal}
      popup
      onClose={() => setShowModal(false)}
    >
      <Modal.Header>
        <h3 className="text-lg font-medium text-gray-900 p-6 px-10">
          Survey Contacts Details
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-x-aut h-screen">
          <Table hoverable striped>
            <Table.Head className="bg-zinc-400">
              <Table.HeadCell>Contact Name</Table.HeadCell>
              <Table.HeadCell>Contact Email</Table.HeadCell>
              <Table.HeadCell>Contact Phone</Table.HeadCell>
              <Table.HeadCell>Survey Mail Sent</Table.HeadCell>
              <Table.HeadCell>Survey Completed</Table.HeadCell>
              <Table.HeadCell>NPS Score</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {surveyContactsData.map((item, val) => {
                return (
                  <Table.Row key={val} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.contactName}
                    </Table.Cell>
                    <Table.Cell>{item.contactEmail}</Table.Cell>
                    <Table.Cell>{item.contactPhone}</Table.Cell>
                    <Table.Cell>
                      {item.surveyMailSent ? "YES" : "NO"}
                    </Table.Cell>
                    <Table.Cell>
                      {item.surveyCompleted ? "YES" : "NO"}
                    </Table.Cell>
                    <Table.Cell>
                      {item.npsScore ? item.npsScore : "NA"}
                    </Table.Cell>
                    <Table.Cell>
                      {item.npsScore ? (
                        "NA"
                      ) : (
                        <Tooltip content="Trigger Survey Mail">
                          <Mail color={"blue"} />
                        </Tooltip>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
}
