import { IOptions } from '@/types';

export default function Radio({
  options,
  checkedId,
  disabled,
  stacked = true,
  idText = '',
  disabledId,
  onChange,
}: {
  options: IOptions[];
  checkedId?: string | number;
  stacked?: boolean;
  idText?: string;
  disabled?: boolean;
  disabledId?: number | string;
  onChange: (id: string | number) => void;
}) {
  return (
    <div
      className={`flex ${
        stacked ? 'flex-col' : 'flex-wrap gap-x-6 gap-y-2'
      } gap-2`}
    >
      {options.map(({ id, name }, inx) => (
        <div
          className="mb-4 flex items-center"
          key={'radio-button-' + inx + '-' + id}
        >
          <input
            id={`radio-button-option-${inx}-${id}`}
            name={`radio-button-option-${idText}${inx}-${id}`}
            type="radio"
            value={name}
            checked={id === checkedId}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
            onChange={() => onChange(id)}
            disabled={disabled && disabledId ? id === disabledId : false}
          />
          <label
            htmlFor={`radio-button-option-${inx}-${id}`}
            className="ms-2 select-none text-sm font-normal text-custom-17"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}
