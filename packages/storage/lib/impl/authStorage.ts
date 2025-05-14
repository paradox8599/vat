import type { CurrentUser } from 'vrchat';
import type { BaseStorage } from '../base/index.js';
import { createStorage, StorageEnum } from '../base/index.js';

type Auth = {
  user: CurrentUser | null;
  updatedAt: number;
};

type AuthStorage = BaseStorage<Auth> & {
  set: (user: Auth['user']) => Promise<void>;
  clear: () => Promise<void>;
};

const storage = createStorage<Auth>(
  'auth-storage-key',
  { user: null, updatedAt: 0 },
  { storageEnum: StorageEnum.Local, liveUpdate: true },
);

// You can extend it with your own methods
export const authStorage: AuthStorage = {
  ...storage,
  set: user => storage.set({ user, updatedAt: Date.now() } as Auth),
  clear: () => storage.set({ user: null, updatedAt: 0 } as Auth),
};
