import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import layoutStyles from '../styles/layout.module.css';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Login</title>
      </Head>
      <main>
        <section className={layoutStyles.grid}>HELLO THIS IS THE HOME PAGE</section>
      </main>
    </Layout>
  );
}
