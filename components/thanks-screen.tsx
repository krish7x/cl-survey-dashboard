"use client";

export default function ThanksScreen(props: { flag: any }) {
  const { flag } = props;
  return (
    <div className="flex w-full h-full justify-center">
      <h1 className="text-txtBlack font-medium text-base py-40 text-center">
        {flag === "SURVEY_COMPLETED"
          ? "Thanks for you valuable feedback."
          : "You had already completed the survey. Thanks for your valuable feedback"}
      </h1>
    </div>
  );
}
