import React, { useEffect } from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import api from '../../api/api';
import { routes } from '../../api/routes';
import { useAuth } from '../../contexts/auth';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import Link from 'next/link';

export default function UpdateProfile() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) Router.push('/login');
  }, [isAuthenticated]);

  const { data, error } = useSWR(isAuthenticated ? routes.profile : null, api.get);

  if (error) return <p>Error loading...</p>;
  if (!data) return <p>Loading</p>;

  return (
    <Layout>
      <Section>Profile edit</Section>
      <Section>
        <Link href="/profile">Back</Link>
      </Section>
    </Layout>
  );
}
