import { IOptions } from "@/types";

export default function Radio({
  options,
  onChange,
  checkedId,
}: {
  options: IOptions[];
  onChange: (id: string | number) => void;
  checkedId?: string | number;
}) {
  return (
    <div className="flex flex-col gap-2">
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
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}
