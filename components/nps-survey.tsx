"use client";
export default function NpsSurvey() {
  return (
    <div className="flex flex-col w-full h-full border-red-900">
      <div className="w-full flex justify-center bg-slate-50 p-5">
        <img src="/carat.png" className="h-10 self-center" />
      </div>
      <div>
        <h1 className="px-56 my-10 text-txtBlack font-semibold  text-3xl text-center">
          Based on your shopping experience, how likely are you to recommend
          CaratLane to your friend and family (on a scale of 1 to 10)?
        </h1>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col">
            <h5 className="text-surveyGreen font-light text-center">
              Definitely
            </h5>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <img src="/10.svg" className="px-5 h-16" />
                <h5 className="text-surveyGreen font-light text-center py-5">10</h5>
              </div>
              <div className="flex flex-col">
                <img src="/9.svg" className="px-5 h-16" />
                <h5 className="text-surveyGreen font-light text-center py-5">9</h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-surveyYellow font-light text-center">Maybe</h5>
            <div className="flex flex-row">
            <div className="flex flex-col">
                <img src="/8.svg" className="px-5 h-16" />
                <h5 className="text-surveyYellow font-light text-center py-5">8</h5>
              </div>
              <div className="flex flex-col">
                <img src="/7.svg" className="px-5 h-16" />
                <h5 className="text-surveyYellow font-light text-center py-5">7</h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-surveyRed font-light text-center">
              Not at all
            </h5>
            <div className="flex flex-row">
            <div className="flex flex-col">
                <img src="/6.svg" className="px-5 h-16" />
                <h5 className="text-surveyRed font-light text-center py-5">6</h5>
              </div>
              <div className="flex flex-col">
                <img src="/5.svg" className="px-5 h-16" />
                <h5 className="text-surveyRed font-light text-center py-5">5</h5>
              </div>
              <div className="flex flex-col">
                <img src="/4.svg" className="px-5 h-16" />
                <h5 className="text-surveyRed font-light text-center py-5">4</h5>
              </div>
              <div className="flex flex-col">
                <img src="/3.svg" className="px-5 h-16" />
                <h5 className="text-surveyRed font-light text-center py-5">3</h5>
              </div>
              <div className="flex flex-col">
                <img src="/2.svg" className="px-5 h-16" />
                <h5 className="text-surveyRed font-light text-center py-5">2</h5>
              </div>
              <div className="flex flex-col">
                <img src="/1.svg" className="px-5 h-16" />
                <h5 className="text-surveyRed font-light text-center py-5">1</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
