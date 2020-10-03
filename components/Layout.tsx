import Head from 'next/head';
import { useAuth } from '../contexts/auth';

export const siteTitle = 'Personal Data';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
      </Head>

      <header />

      <div className="grid grid-cols-1 p-24 min-h-screen">
        <main className="flex flex-col flex-wrap justify-center items-center">{children}</main>

        <footer className="p-12 text-center">
          {isAuthenticated ? (
            <form onSubmit={logout}>
              <button className="transparent">Logout</button>
            </form>
          ) : (
            <div />
          )}
        </footer>
      </div>
    </>
  );
}
