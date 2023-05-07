import { useSession } from 'next-auth/react';

export default function Home() {
  const { data, status } = useSession();

  return (
    <div>
      {status === 'authenticated' && data !== null && (
        <>
          <h2>Welcome {data.user.username}</h2>
          <p>User ID: {data.user.id}</p>
          {JSON.stringify(data.user)}
        </>
      )}
    </div>
  );
}
