# Personal Data UI

Sample project based off [Next.js](https://nextjs.org/).

## Development

Run the following to run the app:

```shell
$ yarn dev
```

### Environment Variables

Copy `.env.example` to `.env.local` and modify the variables there. Read more [here](https://nextjs.org/docs/basic-features/environment-variables).


## Run in Docker

```shell
docker-compose up
```
- use `-d` flag to run in background

## Tear down

```shell
docker-compose down
```

## To re-build

```shell
docker-compose build
```

# Docker
First, to build the container:

```shell
$ docker build - t personal-data-ui .
```

Then to run the image:
```shell
docker run -p 3000:3000 -d personal-data-ui
```

- `-p` exposes the internal port
- `-d` flag will run the container in the background

