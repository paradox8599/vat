import { useAuth } from '../hooks/useAuth';

export function VATApp() {
  const { data: me, isLoading, isValidating, clear } = useAuth();

  return (
    <main>
      <p>{isLoading || isValidating ? 'Loading...' : 'Check'}</p>
      <button onClick={clear}>Clear</button>
      <p>
        {me?.displayName} {me?.currentAvatar}
      </p>
      <p>{JSON.stringify(me)}</p>
    </main>
  );
}
