'use client';

import { tabsAtom, userAtom } from '@/store/atom';
import { IOptions } from '@/types';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Avatar from './avatar';
import HeaderSkeleton from './header-skeleton';

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
    <div className="px-4 md:pl-6 md:pr-10 pt-3 border-b border-b-navBorder flex items-center justify-between w-full ">
      {user?.googleUserEmail ? (
        <div className="flex gap-1 items-center">
          <div className="flex relative gap-1 justify-center items-center">
            <h1 className="text-txtBlack font-semibold ml-2">
              Hi, {user?.googleUserName}{' '}
            </h1>
            <div className="animate-wave">👋</div>

            <div className="text-sm ml-10 font-medium text-center text-gray-500 border-b border-gray-200">
              <ul className="flex flex-wrap -mb-px">
                {tabsOption.map((val, inx) => (
                  <li
                    className="me-2"
                    key={'tabs-' + inx}
                  >
                    <button
                      className={`inline-block p-4 border-b-2 border-transparent ${
                        tabs.id === val.id
                          ? ' border-b-blue-600'
                          : 'hover:text-gray-600 active hover:border-gray-300'
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
