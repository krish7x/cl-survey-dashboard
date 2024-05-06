import { Toast } from 'flowbite-react';
import { AlertOctagon } from 'lucide-react';
import { useEffect } from 'react';

export default function ToastComponent({
  toast,
  setToast,
}: {
  toast: string;
  setToast: (value: string) => void;
}) {
  useEffect(() => {
    if (toast.length) {
      setTimeout(() => {
        setToast('');
      }, 5000);
    }
  }, [setToast, toast]);
  return (
    <Toast duration={500}>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200 ">
        <AlertOctagon className="stroke-custom-18" />
      </div>
      <div className="ml-3 text-sm font-normal">{toast}</div>
      <Toast.Toggle />
    </Toast>
  );
}
