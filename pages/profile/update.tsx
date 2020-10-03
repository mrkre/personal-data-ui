import React, { useEffect, useState, useMemo } from 'react';
import cx from 'classnames';
import { pickBy } from 'lodash';
import Router from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import api from '../../api/api';
import { routes } from '../../api/routes';
import { useAuth } from '../../contexts/auth';
import Layout, { siteTitle } from '../../components/Layout';
import Section from '../../components/Section';
import Card from '../../components/Card';
import styles from '../../styles/profile.module.css';
import { ProfileForm } from '../../types/profile';
import Head from 'next/head';

export default function UpdateProfile() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) Router.push('/login');
  }, [isAuthenticated]);

  const { handleSubmit, register, errors, formState } = useForm();

  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (params: ProfileForm) => {
    const { key, ...profileParams } = params;
    const { address, ...restOfProfile } = profileParams;
    await api
      .post(routes.profile, {
        key,
        profile: {
          ...(address && pickBy(address)),
          ...pickBy(restOfProfile),
        },
      })
      .then(() => {
        // do nothing
      })
      .catch((err) => {
        setSubmitError(err?.response?.data.message || err.message);
      });
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Profile</title>
      </Head>

      <Section>
        <Card>
          {submitError && <div className="text-danger">{submitError}</div>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <td colSpan={2}>
                    <h1 className="mb-2">Update Profile</h1>
                  </td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={styles.titleCell}>First Name</td>
                  <td>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      ref={register}
                      className={cx({ error: errors.firstName })}
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName.message}</div>}
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Last Name</td>
                  <td>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      ref={register}
                      className={cx({ error: errors.lastName })}
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName.message}</div>}
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Date of Birth</td>
                  <td>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      ref={register}
                      className={cx({ error: errors.dateOfBirth })}
                    />
                    {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth.message}</div>}
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Address</td>
                  <td>&nbsp;</td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Street</td>
                  <td>
                    <input
                      id="address.street"
                      name="address.street"
                      type="text"
                      ref={register}
                      className={cx({ error: errors.address?.street })}
                    />
                    {errors.address?.street && <div className="text-danger">{errors.address.street.message}</div>}
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Unit</td>
                  <td>
                    <input
                      id="address.unit"
                      name="address.unit"
                      type="text"
                      ref={register}
                      className={cx({ error: errors.address?.unit })}
                    />
                    {errors.address?.unit && <div className="text-danger">{errors.address.unit.message}</div>}
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>City</td>
                  <td>
                    <input
                      id="address.city"
                      name="address.city"
                      type="text"
                      ref={register}
                      className={cx({ error: errors.city?.street })}
                    />
                    {errors.address?.city && <div className="text-danger">{errors.address.city.message}</div>}
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Country</td>
                  <td>
                    <input
                      id="address.country"
                      name="address.country"
                      type="text"
                      ref={register}
                      className={cx({ error: errors.address?.country })}
                    />
                    {errors.address?.country && <div className="text-danger">{errors.address.country.message}</div>}
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Postal Code</td>
                  <td>
                    <input
                      id="address.postalCode"
                      name="address.postalCode"
                      type="text"
                      ref={register}
                      className={cx({ error: errors.address?.postalCode })}
                    />
                    {errors.address?.postalCode && (
                      <div className="text-danger">{errors.address.postalCode.message}</div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Phone</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>

                <tr>
                  <td className={styles.titleCell}>Encryption key</td>
                  <td>
                    <input
                      id="key"
                      name="key"
                      type="text"
                      ref={register({ required: 'Required' })}
                      className={cx({ error: errors.key })}
                    />
                    {errors.key && <div className="text-danger">{errors.key.message}</div>}
                  </td>
                </tr>

                <tr>
                  <td colSpan={2}>
                    <button className="primary" type="submit" disabled={formState.isSubmitting}>
                      Save
                    </button>
                  </td>
                </tr>
              </tbody>

              <tfoot className="border-t-2 border-gray-200">
                <tr>
                  <td colSpan={2}>
                    <Link href="/profile">Back</Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </form>
        </Card>
      </Section>
    </Layout>
  );
}
