'use client';

import Radio from '@/components/micros/radio';
import Select from '@/components/micros/select';
import StarRating from '@/components/micros/star-rating';
import { IOptions } from '@/types';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Components() {
  const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  //star rating goes here
  const [rating, setRating] = useState<number>(0);
  const onStarRatingChange = useCallback(
    (value: number) => {
      setRating(value);
    },
    [setRating],
  );

  //single select goes here
  const [singleSelectOptions] = useState<IOptions[]>(
    OPTIONS.map((val, inx) => ({ id: inx, name: val })),
  );
  const [singleSelectedOptions, setSingleSelectedOptions] = useState<
    Array<number | string>
  >([]);
  const onSingleSelectChange = useCallback(
    (inx: number | string, maxSelect: number) => {
      if (singleSelectedOptions.length < maxSelect) {
        if (!singleSelectedOptions.includes(inx)) {
          setSingleSelectedOptions([...singleSelectedOptions, inx]);
        } else {
          setSingleSelectedOptions(val => val.filter(val => val !== inx));
        }
      } else {
        setSingleSelectedOptions(val => [...val.slice(1), inx]);
      }
    },
    [singleSelectedOptions, setSingleSelectedOptions],
  );

  //multi select goes here
  const [multiSelectOptions] = useState<IOptions[]>(
    OPTIONS.map((val, inx) => ({ id: inx, name: val })),
  );
  const [multiSelectedOptions, setMultiSelectedOptions] = useState<
    Array<number | string>
  >([]);
  const onMultiSelectChange = useCallback(
    (inx: number | string, maxSelect: number) => {
      if (multiSelectedOptions.length < maxSelect) {
        if (!multiSelectedOptions.includes(inx)) {
          setMultiSelectedOptions([...multiSelectedOptions, inx]);
        } else {
          setMultiSelectedOptions(val => val.filter(val => val !== inx));
        }
      } else {
        setMultiSelectedOptions(val => [...val.slice(1), inx]);
      }
    },
    [multiSelectedOptions, setMultiSelectedOptions],
  );

  //radio button goes here
  const [radioOptions] = useState<IOptions[]>(
    OPTIONS.map((val: string) => ({ id: uuidv4(), name: val })),
  );

  const [radioOptions1] = useState<IOptions[]>(
    OPTIONS.map((val: string) => ({ id: uuidv4(), name: val })),
  );
  const [checkedRadio, setCheckedRadio] = useState<string | number>();
  const [checkedRadio1, setCheckedRadio1] = useState<string | number>();

  const onRadioChange = useCallback((id: number | string) => {
    setCheckedRadio(id);
  }, []);

  const onRadioChange1 = useCallback((id: number | string) => {
    setCheckedRadio1(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-8">
      <div className="flex flex-col gap-4">
        <h1>Star Rating component</h1>
        <StarRating
          starCount={5}
          rating={rating}
          onChange={onStarRatingChange}
        />
      </div>

      <div className="flex w-96 flex-col gap-2">
        <h1>Multiple choice with single select</h1>
        <Select
          options={singleSelectOptions}
          selectedOptions={singleSelectedOptions}
          maxSelect={1}
          onChange={onSingleSelectChange}
        />
      </div>

      <div className="flex w-96 flex-col gap-2">
        <h1>Multiple choice with multi select</h1>
        <Select
          options={multiSelectOptions}
          maxSelect={2}
          onChange={onMultiSelectChange}
          selectedOptions={multiSelectedOptions}
        />
      </div>

      <div className="flex w-96 flex-col gap-2">
        <h1>Radio Button</h1>
        <Radio
          options={radioOptions}
          onChange={onRadioChange}
          checkedId={checkedRadio}
        />
      </div>

      <div className="flex w-96 flex-col gap-2">
        <h1>Radio Button</h1>
        <Radio
          options={radioOptions1}
          onChange={onRadioChange1}
          checkedId={checkedRadio1}
        />
      </div>
    </div>
  );
}
