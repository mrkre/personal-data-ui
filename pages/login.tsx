import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import Section from '../components/Section';

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Login</title>
      </Head>
      <Section>Login</Section>
    </Layout>
  );
}
