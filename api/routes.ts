const apiV1 = '/api/v1';

export const routes = {
  auth: {
    login: `${apiV1}/auth/login`,
    logout: `${apiV1}/auth/logout`,
    register: `${apiV1}/auth/register`,
    token: `${apiV1}/auth/token`,
  },
  profile: `${apiV1}/profile`,
};
