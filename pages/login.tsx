import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import layoutStyles from '../styles/layout.module.css';

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Login</title>
      </Head>
      <section className={layoutStyles.grid}>Login</section>
    </Layout>
  );
}
