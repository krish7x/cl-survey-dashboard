'use client';

import { tabsAtom, userAtom } from '@/store/atom';
import { IOptions } from '@/types';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Avatar from '../micros/avatar';
import HeaderSkeleton from '../micros/header-skeleton';

export default function Header() {
  const router = useRouter();
  const { get } = useSearchParams();
  const user = useAtomValue(userAtom);
  const [tabs, setTabs] = useAtom(tabsAtom);
  const [projectId, setProjectId] = useState('');
  const tabsOption = useMemo(
    () => [
      {
        id: 1,
        name: 'Surveys',
      },
      {
        id: 2,
        name: 'Templates',
      },
    ],
    [],
  );

  useEffect(() => {
    setProjectId(get('projectId') as string);
    const tabId = +(get('tab') || '1');
    const curTab = tabsOption.find(val => val.id === tabId);
    setTabs(curTab as IOptions);
  }, [get, setTabs, tabsOption]);

  return (
    <div className="flex w-full items-center justify-between border-b border-b-custom-5 px-4 pt-3 md:pl-6 md:pr-10 ">
      {user?.googleUserEmail ? (
        <div className="flex w-full items-center gap-1">
          <div className="flex w-[calc(20%-64px)] gap-2">
            {' '}
            <h1 className="text-txtBlack ml-2 font-semibold">
              Hi, {user?.googleUserName}{' '}
            </h1>
            <div className="animate-wave">👋</div>
          </div>

          <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
            <ul className="-mb-px flex flex-wrap">
              {tabsOption.map((val, inx) => (
                <li
                  className="me-2"
                  key={'tabs-' + inx}
                >
                  <button
                    className={`inline-block border-b-2 border-transparent p-4 ${
                      tabs.id === val.id
                        ? ' border-b-blue-600'
                        : 'active hover:border-gray-300 hover:text-gray-600'
                    } rounded-t-lg `}
                    onClick={() => {
                      router.push(
                        `?${projectId ? `projectId=${projectId}&` : ''}tab=${
                          val.id
                        }`,
                      );
                      setTabs(val);
                    }}
                  >
                    {val.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <HeaderSkeleton />
      )}
      <Avatar
        email={user?.googleUserEmail}
        name={user?.googleUserName}
        image={user?.googleUserImage}
      />
    </div>
  );
}
