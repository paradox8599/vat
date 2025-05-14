import { useStorage } from '@extension/shared';
import { authStorage } from '@extension/storage';
import React from 'react';
import useSWR from 'swr';
import type { CurrentUser } from 'vrchat';

const UPDATE_INTERVAL = 5 * 60 * 1000;

export function useAuth() {
  const authStore = useStorage(authStorage);

  const isStale = authStore.user === null || Date.now() - authStore.updatedAt > UPDATE_INTERVAL;

  const swr = useSWR(isStale ? 'auth' : null, async () => {
    await new Promise(resolve => setTimeout(resolve, 3 * 1000));
    const res = await fetch('https://vrchat.com/api/1/auth/user');
    if (!res.ok) return null;
    return (await res.json()) as CurrentUser;
  });

  React.useEffect(() => {
    if (swr.data === void 0) return;
    authStorage.set(swr.data);
  }, [swr.data]);

  return {
    ...swr,
    data: authStore.user,
    clear: authStorage.clear,
  };
}
