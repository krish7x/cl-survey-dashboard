import { IOptions } from "@/types";

export default function Radio({
  options,
  onChange,
  checkedId,
  stacked = true,
  checked = false,
  checkOption = null,
}: {
  options: IOptions[];
  onChange: (id: string | number) => void;
  checkedId?: string | number;
  stacked?: boolean;
  checked?: boolean;
  checkOption?: number | null;
}) {
  return (
    <div
      className={`flex ${
        stacked ? "flex-col" : "flex-wrap gap-x-6 gap-y-2"
      } gap-2`}
    >
      {options.map(({ id, name }, inx, self) => (
        <div className="flex items-center mb-4" key={"radio-button-" + inx}>
          <input
            id={`${id}`}
            type="radio"
            value=""
            name="default-radio"
            checked={checked ? inx === checkOption : id === checkedId}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            onChange={() => onChange(id)}
            disabled={checked ? inx !== checkOption : false}
          />
          <label
            htmlFor={`${id}`}
            className="ms-2 text-sm font-normal text-txtBlack select-none"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}
