import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import Section from '../components/Section';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/auth';

export default function Home() {
  const { isAuthenticated } = useAuth();

  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Login</title>
      </Head>
      <main>
        <Section>
          <div className="text-center">
            <h1>Welcome</h1>
            <p className="mb-6">Manage your personal data with our awesome tool.</p>
            <p>
              {isAuthenticated ? (
                <button type="button" onClick={() => router.push('/profile')}>
                  Profile
                </button>
              ) : (
                <button type="button" onClick={() => router.push('/login')}>
                  Login
                </button>
              )}
            </p>
          </div>
        </Section>
      </main>
    </Layout>
  );
}
