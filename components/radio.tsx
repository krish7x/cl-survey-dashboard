import { IOptions } from "@/types";

export default function Radio({
  options,
  onChange,
  checkedId,
  stacked = true,
}: {
  options: IOptions[];
  onChange: (id: string | number) => void;
  checkedId?: string | number;
  stacked?: boolean;
}) {
  return (
    <div
      className={`flex ${
        stacked ? "flex-col" : "flex-wrap gap-x-6 gap-y-2"
      } gap-2`}
    >
      {options.map(({ id, name }, inx) => (
        <div className="flex items-center mb-4" key={"radio-button-" + inx}>
          <input
            id={`${id}`}
            type="radio"
            value=""
            name="default-radio"
            checked={id === checkedId}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => onChange(id)}
          />
          <label
            htmlFor={`${id}`}
            className="ms-2 text-sm font-normal text-radio select-none"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}
