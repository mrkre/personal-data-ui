import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Router from 'next/router';
import cx from 'classnames';
import Layout, { siteTitle } from '../components/Layout';
import Section from '../components/Section';
import Card from '../components/Card';
import FlashError from '../components/FlashError';
import { useAuth } from '../contexts/auth';
import api from '../api/api';
import { routes } from '../api/routes';

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { setToken, isAuthenticated } = useAuth();

  const { handleSubmit, register, errors, formState } = useForm();

  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) Router.push('/profile');
  }, [isAuthenticated]);

  const onSubmit = async ({ email, confirmPassword, password }: RegisterForm) => {
    await api
      .post(routes.auth.register, { email, confirmPassword, password })
      .then(async (res) => {
        await setToken({ token: res.data.token });
      })
      .catch((err) => {
        setSubmitError(err?.response?.data || err.message);
      });
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Register</title>
      </Head>
      <Section>
        <Card>
          <form className="min-w-md" onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>

            <div className="w-full">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className={cx({ error: errors.email })}
                ref={register({
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <div className="text-danger">{errors.email.message}</div>}
            </div>

            <div className="w-full">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className={cx({ error: errors.password })}
                ref={register({ required: 'Required' })}
              />
              {errors.password && <div className="text-danger">{errors.password.message}</div>}
            </div>

            <div className="w-full">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={cx({ error: errors.confirmPassword })}
                ref={register({ required: 'Required' })}
              />
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword.message}</div>}
            </div>

            <div>
              <button className="w-full primary" type="submit" disabled={formState.isSubmitting}>
                Submit
              </button>

              <FlashError error={submitError} />
            </div>
          </form>
        </Card>
      </Section>
    </Layout>
  );
}
