FROM mhart/alpine-node:14

ENV NODE_ENV=development
WORKDIR /personal-data-ui

COPY yarn.lock package.json ./
RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]
