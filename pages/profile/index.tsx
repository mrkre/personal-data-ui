import React, { useEffect, useState, useMemo } from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import Link from 'next/link';
import api from '../../api/api';
import { routes } from '../../api/routes';
import { useAuth } from '../../contexts/auth';
import Layout, { siteTitle } from '../../components/Layout';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { ProfileResponse } from '../../types/profile';
import styles from '../../styles/profile.module.css';
import Head from 'next/head';

const substring = (string) => (string ? `${string.substring(0, 24)}` : '-');

const displayString = (encrypted, string) => (encrypted ? substring(string) : string || '-');

export default function Profile() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) Router.push('/login');
  }, [isAuthenticated]);

  const [key, setKey] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setKey(e.target.value);
  };

  const params = useMemo(() => ({ key }), [key]);

  const { data, error } = useSWR(isAuthenticated ? [routes.profile, params] : null, (url, params) =>
    api.get(url, { params }),
  );

  if (error) return <p>Error loading...</p>;
  if (!data) return <p>Loading</p>;

  const { firstName, lastName, dateOfBirth, address, phone, encrypted, success } = data.data as ProfileResponse;

  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Profile</title>
      </Head>

      <Section>
        <Card>
          <table className={styles.table}>
            <thead>
              <tr>
                <td colSpan={2}>
                  <h1 className="mb-2">Profile</h1>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className={styles.titleCell}>First Name</td>
                <td>{displayString(encrypted, firstName)}</td>
              </tr>

              <tr>
                <td className={styles.titleCell}>Last Name</td>
                <td>{displayString(encrypted, lastName)}</td>
              </tr>

              <tr className="border-b-2 border-gray-200">
                <td className={styles.titleCell}>Date of Birth</td>
                <td>{displayString(encrypted, dateOfBirth)}</td>
              </tr>

              <tr>
                <td className={styles.titleCell}>Address</td>
                <td>&nbsp;</td>
              </tr>

              <tr>
                <td className={styles.titleCell}>Street</td>
                <td>{displayString(encrypted, address?.street)}</td>
              </tr>

              <tr>
                <td className={styles.titleCell}>Unit</td>
                <td>{displayString(encrypted, address?.unit)}</td>
              </tr>

              <tr>
                <td className={styles.titleCell}>City</td>
                <td>{displayString(encrypted, address?.city)}</td>
              </tr>

              <tr>
                <td className={styles.titleCell}>Country</td>
                <td>{displayString(encrypted, address?.country)}</td>
              </tr>

              <tr>
                <td className={styles.titleCell}>Postal Code</td>
                <td>{displayString(encrypted, address?.postalCode)}</td>
              </tr>

              <tr>
                <td className={styles.titleCell}>Phone</td>
                <td>{displayString(encrypted, phone)}</td>
              </tr>
            </tbody>

            <tfoot className="border-t-2 border-gray-200">
              {encrypted ? (
                <tr>
                  <td>Data is encrypted</td>
                  <td>
                    {encrypted && (
                      <form>
                        <input
                          className="mb-0"
                          type="text"
                          placeholder="Decrypt with your key"
                          id="key"
                          onBlur={handleSubmit}
                        />
                      </form>
                    )}
                  </td>
                </tr>
              ) : (
                <></>
              )}
              {key && !success ? (
                <tr>
                  <td colSpan={2}>
                    <span className="text-danger">Error decrypting - check key</span>
                  </td>
                </tr>
              ) : (
                <></>
              )}
              <tr>
                <td colSpan={2}>
                  <Link href="/profile/update">Edit profile</Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </Card>
      </Section>
    </Layout>
  );
}
