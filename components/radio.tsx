import { IOptions } from '@/types';

export default function Radio({
  options,
  onChange,
  checkedId,
  disabled,
  stacked = true,
  idText = '',
  disabledId,
}: {
  options: IOptions[];
  onChange: (id: string | number) => void;
  checkedId?: string | number;
  stacked?: boolean;
  idText?: string;
  disabled?: boolean;
  disabledId?: number | string;
}) {
  return (
    <div
      className={`flex ${
        stacked ? 'flex-col' : 'flex-wrap gap-x-6 gap-y-2'
      } gap-2`}
    >
      {options.map(({ id, name }, inx) => (
        <div
          className="flex items-center mb-4"
          key={'radio-button-' + inx + '-' + id}
        >
          <input
            id={`radio-button-option-${inx}-${id}`}
            name={`radio-button-option-${idText}${inx}-${id}`}
            type="radio"
            value={name}
            checked={id === checkedId}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            onChange={() => onChange(id)}
            disabled={disabled && disabledId ? id === disabledId : false}
          />
          <label
            htmlFor={`radio-button-option-${inx}-${id}`}
            className="ms-2 text-sm font-normal text-radioText select-none"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}
