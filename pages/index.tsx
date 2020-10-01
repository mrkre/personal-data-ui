import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Login</title>
      </Head>
      <main>
        <section>HELLO THIS IS THE HOME PAGE</section>
      </main>
    </Layout>
  );
}
