'use client';

import Image from 'next/image';

export default function ThanksScreen(props: { flag: string }) {
  const { flag } = props;
  return (
    <div className="flex flex-col items-center gap-4 max-sm:px-4">
      <h1 className="pt-40 text-center text-xl font-semibold text-custom-4 md:w-[calc(500px)]">
        {flag === 'SURVEY_COMPLETED'
          ? 'Thanks for you valuable feedback.'
          : 'You have completed the survey. Thanks for your valuable feedback'}
      </h1>
      <div>
        <Image
          src={`/10.svg`}
          alt={`Thanks emoji`}
          width={72}
          height={72}
        />
      </div>
    </div>
  );
}
