import { userAtom } from "@/store/atom";
import { IProject } from "@/types";
import { Sidebar, Tooltip } from "flowbite-react";
import { useAtomValue } from "jotai";
import { PlusCircle } from "lucide-react";
import { useMemo } from "react";

export default function SidebarComponent({
  setShowModal,
  projects,
}: {
  setShowModal: (flag: boolean) => void;
  projects: IProject[];
}) {
  const user = useAtomValue(userAtom);
  const isAdmin = useMemo(() => user && user.role === "admin", [user]);
  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="h-[calc(100vh-90px)]"
    >
      <div className="flex justify-between items-center px-5 mb-2">
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
      {projects?.length
        ? projects.map(({ id, projectName }) => (
            <Sidebar.Items key={"Project-" + id}>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="#" className="text-sidebarText text-sm">
                  {projectName}
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          ))
        : null}
    </Sidebar>
  );
}
