import { IToast } from '@/types';
import { Toast } from 'flowbite-react';
import { Check, X } from 'lucide-react';
import { useEffect } from 'react';

export default function ToastComponent({
  toast,
  setToast,
}: {
  toast: IToast;
  setToast: (value: IToast) => void;
}) {
  useEffect(() => {
    const ms = toast.type === 'success' ? 5000 : 10000;
    if (toast.message.length) {
      setTimeout(() => {
        setToast({
          type: '',
          message: '',
        });
      }, ms);
    }
  }, [setToast, toast]);
  return (
    <Toast>
      {toast.type === 'success' ? (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <Check className="h-5 w-5" />
        </div>
      ) : (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <X className="h-5 w-5" />
        </div>
      )}
      <div className="ml-3 text-sm font-normal">{toast.message}</div>
      <Toast.Toggle />
    </Toast>
  );
}
