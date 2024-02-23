"use client";
import { NotebookPen } from "lucide-react";
import { useMemo } from "react";

export default function SurevyIcon() {
  const iconBg = useMemo(() => {
    const colors = ["bg-surveyIcon1", "bg-surveyIcon2", "bg-surveyIcon3"];
    const rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
  }, []);
  return (
    <div
      className={`${iconBg} w-14 h-14 rounded-lg flex justify-center items-center`}
    >
      <NotebookPen fill="#fff" size={32} />
    </div>
  );
}
