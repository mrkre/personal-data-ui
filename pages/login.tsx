import { useEffect } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import Layout, { siteTitle } from '../components/Layout';
import Section from '../components/Section';
import Card from '../components/Card';
import { useAuth } from '../contexts/auth';
import api from '../api/api';
import { routes } from '../api/routes';
import { useState } from 'react';

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { setToken } = useAuth();

  const { handleSubmit, register, errors, formState } = useForm();

  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async ({ email, password }: LoginForm) => {
    await api
      .post(routes.auth.login, { email, password })
      .then(async (res) => {
        await setToken({ token: res.data.token });
      })
      .catch((err) => {
        setSubmitError(err?.response?.data.message || err.message);
      });
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Login</title>
      </Head>
      <Section>
        <Card>
          <h2>Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            <div>
              <button className="w-full" type="submit" disabled={formState.isSubmitting}>
                Submit
              </button>

              {submitError && <div className="text-danger mt-3 mb-0">{submitError}</div>}
            </div>
          </form>
        </Card>
      </Section>
    </Layout>
  );
}
