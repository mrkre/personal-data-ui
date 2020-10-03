import Head from 'next/head';

export const siteTitle = 'Personal Data';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
      </Head>

      <header />

      {children}
    </>
  );
}
