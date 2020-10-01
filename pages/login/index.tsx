import Head from 'next/head';
import Layout, { siteTitle } from '../../components/Layout';
import authStyles from '../styles/auth.module.css';

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Login</title>
      </Head>
      <section className={authStyles.grid}>Login</section>
    </Layout>
  );
}
