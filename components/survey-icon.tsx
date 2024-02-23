import { NotebookPen } from "lucide-react";
import { useMemo } from "react";

export default function SurevyIcon() {
  const iconBg = useMemo(() => {
    const colors = ["bg-surveyIcon1", "bg-surveyIcon2", "bg-surveyIcon3"];
    const rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
  }, []);
  console.log({ iconBg });
  return (
    <div
      className={`w-14 h-14 rounded-lg ${iconBg} flex justify-center items-center`}
    >
      <NotebookPen fill="#fff" size={32} />
    </div>
  );
}
