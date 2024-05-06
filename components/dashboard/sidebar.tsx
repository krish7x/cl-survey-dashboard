import { userAtom } from '@/store/atom';
import { IProject } from '@/types';
import { Button, Modal, Sidebar, Tooltip } from 'flowbite-react';
import { useAtomValue } from 'jotai';
import truncate from 'lodash.truncate';
import { AlertOctagon, PlusCircle, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import ListSkeleton from '../micros/list-skeleton';

export default function SidebarComponent({
  projects,
  currentProject,
  setShowModal,
  setCurrentProject,
  onDeleteProject,
}: {
  projects: IProject[];
  currentProject?: IProject;
  setShowModal: (flag: boolean) => void;
  setCurrentProject: (data: IProject) => void;
  onDeleteProject: (val: string) => void;
}) {
  const router = useRouter();
  const { get } = useSearchParams();
  const user = useAtomValue(userAtom);
  const isAdmin = useMemo(() => user && user.role === 'admin', [user]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState('');

  useEffect(() => {
    const projectId = get('projectId');
    const curProject = projects.find(val => val.id === projectId);
    setCurrentProject(curProject ? (curProject as IProject) : projects[0]);
  }, [get, projects, setCurrentProject]);

  const tab = useMemo(() => get('tab'), [get]);
  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="w-[calc(20%)] overflow-y-scroll scrollbar-hide"
    >
      <div className="mb-4 flex items-center justify-between pl-5 pr-2 scrollbar-hide">
        <h1 className="text-md font-medium text-custom-3">Projects</h1>
        <Tooltip
          content="Create Project"
          placement="top"
          className="w-28"
        >
          {isAdmin && (
            <PlusCircle
              color="#63686F"
              width={24}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          )}
        </Tooltip>
      </div>
      <div className="flex flex-col gap-1 ">
        {projects?.length ? (
          projects.map(data => (
            <Sidebar.Items
              key={'Project-' + data.id}
              className="select-none"
            >
              <Sidebar.ItemGroup className="relative">
                <Sidebar.Item
                  className={`-mr-3 flex cursor-pointer rounded-none py-3 text-sm font-medium text-custom-6 ${
                    currentProject?.id === data.id
                      ? "bg-custom-5 before:absolute before:-left-2 before:top-0 before:h-full before:w-1 before:bg-custom-7 before:content-[''] hover:bg-custom-5"
                      : ''
                  }`}
                  onClick={() => {
                    router.push(
                      `?projectId=${data.id}${tab ? `&tab=${tab}` : ''}`,
                    );
                    setCurrentProject(data);
                  }}
                >
                  {truncate(data.projectName, {
                    length: 25,
                  })}
                  <Trash2
                    size={20}
                    className="absolute bottom-3 right-2 z-20 opacity-70"
                    onClick={() => {
                      setDeleteProjectId(data.id);
                      setOpenDeleteModal(true);
                    }}
                  />
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          ))
        ) : (
          <ListSkeleton />
        )}
      </div>

      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AlertOctagon className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this project
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  onDeleteProject(deleteProjectId);
                  setOpenDeleteModal(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={() => setOpenDeleteModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Sidebar>
  );
}
