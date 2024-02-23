import { userAtom } from "@/store/atom";
import { IProject } from "@/types";
import { Sidebar, Tooltip } from "flowbite-react";
import { useAtomValue } from "jotai";
import { PlusCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ListSkeleton from "./list-skeleton";

export default function SidebarComponent({
  setShowModal,
  projects,
  currentProject,
  setCurrentProject,
}: {
  setShowModal: (flag: boolean) => void;
  projects: IProject[];
  currentProject: IProject | null;
  setCurrentProject: (data: IProject) => void;
}) {
  const user = useAtomValue(userAtom);
  const isAdmin = useMemo(() => user && user.role === "admin", [user]);

  return (
    <Sidebar aria-label="Default sidebar example">
      <div className="flex justify-between items-center px-5 mb-4">
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
      <div className="flex flex-col gap-1">
        {projects?.length ? (
          projects.map((data) => (
            <Sidebar.Items key={"Project-" + data.id}>
              <Sidebar.ItemGroup className="relative">
                <Sidebar.Item
                  className={`text-sidebarText text-sm  cursor-pointer font-medium -mr-3 rounded-none ${
                    currentProject?.id === data.id
                      ? "bg-navBg before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-navLeftBorder"
                      : ""
                  }`}
                  onClick={() => setCurrentProject(data)}
                >
                  {data.projectName}
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          ))
        ) : (
          <ListSkeleton />
        )}
      </div>
    </Sidebar>
  );
}
