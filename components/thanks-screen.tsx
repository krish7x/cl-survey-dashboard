"use client";

import Image from "next/image";

export default function ThanksScreen(props: { flag: any }) {
  const { flag } = props;
  return (
    <div className="flex flex-col max-sm:px-4 gap-4 items-center">
      <h1 className="text-txtBlack font-semibold text-xl pt-40 md:w-[calc(500px)] text-center">
        {flag === "SURVEY_COMPLETED"
          ? "Thanks for you valuable feedback."
          : "You had already completed the survey. Thanks for your valuable feedback"}
      </h1>
      <div>
        <Image src={`/10.svg`} alt={`Thanks emoji`} width={72} height={72} />
      </div>
    </div>
  );
}
