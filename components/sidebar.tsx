import { userAtom } from "@/store/atom";
import { IProject } from "@/types";
import { Button, Modal, Sidebar, Tooltip } from "flowbite-react";
import { useAtomValue } from "jotai";
import { AlertOctagon, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ListSkeleton from "./list-skeleton";
import truncate from "lodash.truncate";
import { useRouter, useSearchParams } from "next/navigation";

export default function SidebarComponent({
  setShowModal,
  projects,
  currentProject,
  setCurrentProject,
  onDeleteProject,
}: {
  setShowModal: (flag: boolean) => void;
  projects: IProject[];
  currentProject?: IProject;
  setCurrentProject: (data: IProject) => void;
  onDeleteProject: (val: number) => void;
}) {
  const router = useRouter();
  const { get } = useSearchParams();
  const user = useAtomValue(userAtom);
  const isAdmin = useMemo(() => user && user.role === "admin", [user]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(0);

  useEffect(() => {
    const projectId = +(get("projectId") || "0");
    const curProject = projects.find((val) => val.id === projectId);
    setCurrentProject(curProject as IProject);
  }, [get, projects, setCurrentProject]);

  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="overflow-y-scroll scrollbar-hide w-72"
    >
      <div className="flex justify-between items-center pl-5 pr-2 mb-4 scrollbar-hide">
        <h1 className="text-txtPurple text-md font-medium">Projects</h1>
        <Tooltip content="Create Project" placement="top" className="w-28">
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
          projects.map((data) => (
            <Sidebar.Items key={"Project-" + data.id} className="select-none">
              <Sidebar.ItemGroup className="relative">
                <Sidebar.Item
                  className={`text-sidebarText text-sm py-3 flex cursor-pointer font-medium -mr-3 rounded-none ${
                    currentProject?.id === data.id
                      ? "bg-navBg before:content-[''] before:absolute before:top-0 before:-left-2 before:w-1 before:h-full before:bg-navLeftBorder hover:bg-navBg"
                      : ""
                  }`}
                  onClick={() => {
                    router.push(`?projectId=${data.id}`);
                    setCurrentProject(data);
                  }}
                >
                  {truncate(data.projectName, {
                    length: 25,
                  })}
                  <Trash2
                    size={20}
                    className="absolute right-2 bottom-3 opacity-70 z-20"
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
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Sidebar>
  );
}
