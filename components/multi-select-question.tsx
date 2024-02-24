"use client";
export default function MultiSelectQuestion() {
  return (
    <div className="flex flex-col w-full h-full border-red-900 align-middle">
      <div className="w-full flex justify-center bg-slate-50 p-5">
        <img src="/carat.png" className="h-10 self-center" />
      </div>

      <div className="flex flex-col w-full items-center">
        <h3 className="px-56 my-10 text-txtBlack font-semibold  text-2xl text-center">
          Hurray! You made our day extra special, please let us know what you
          liked the most.
        </h3>

        <div className="bg-gray-300 py-2 my-2 w-5/12">
            <h3 className="text-textBlack font-normal text-base text-center">
            Timely & Prompt Delivery
            </h3>
        </div>

        <div className="bg-purple-950 py-2 my-2 w-5/12">
            <h3 className="text-white font-normal text-base text-center">
                Value for Money
            </h3>
        </div>

        <div className="bg-gray-300 py-2 my-2 w-5/12">
            <h3 className="text-textBlack font-normal text-base text-center">
                Design & Product Quality
            </h3>
        </div>

        <div className="bg-gray-300 py-2 my-2 w-5/12">
            <h3 className="text-textBlack font-normal text-base text-center">
                Discount & Offers
            </h3>
        </div>

        <div className="bg-gray-300 py-2 my-2 w-5/12">
            <h3 className="text-textBlack font-normal text-base text-center">
                Others
            </h3>
        </div>


      </div>
    </div>
  );
}
