export default function MainPanelSkeleton() {
  return (
    <div
      role="status"
      className="mt-6 w-full animate-pulse space-y-8 divide-gray-200 rounded p-4 md:p-6 dark:divide-gray-700 "
    >
      <div className="flex w-full items-center gap-3 py-4  pt-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="w-full">
          <div className="mb-2.5 h-2.5 w-3/4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>

      <div className="flex w-full items-center gap-3 py-4  pt-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="w-full">
          <div className="mb-2.5 h-2.5 w-3/4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>

      <div className="flex w-full items-center gap-3 py-4  pt-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="w-full">
          <div className="mb-2.5 h-2.5 w-3/4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
