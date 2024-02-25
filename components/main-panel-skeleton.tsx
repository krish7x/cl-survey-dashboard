export default function MainPanelSkeleton() {
  return (
    <div
      role="status"
      className="w-full p-4 mt-6 space-y-8 divide-gray-200 rounded animate-pulse dark:divide-gray-700 md:p-6 "
    >
      <div className="flex w-full gap-3 items-center pt-4  py-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-3/4 mb-2.5"></div>
          <div className="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>

      <div className="flex w-full gap-3 items-center pt-4  py-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-3/4 mb-2.5"></div>
          <div className="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>

      <div className="flex w-full gap-3 items-center pt-4  py-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-3/4 mb-2.5"></div>
          <div className="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
