import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../api/api';
import { routes } from '../api/routes';
import useSWR from 'swr';
import { useAuth } from '../contexts/auth';
import Router from 'next/router';
import layoutStyles from '../styles/layout.module.css';

export default function Profile() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) Router.push('/login');
  }, [isAuthenticated]);

  const { data, error } = useSWR(isAuthenticated ? routes.profile : null, api.get);

  if (error) return <p>Error loading...</p>;
  if (!data) return <p>Loading</p>;

  return (
    <Layout>
      <section className={layoutStyles.grid}>Profile page</section>
    </Layout>
  );
}
