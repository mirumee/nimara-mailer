<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/logo-light.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/logo.svg">
    <img width="200" alt="nimara logo" src="docs/logo.svg">
  </picture>
</div>
<br />
<br />

<div align="center">
  <h1>Nimara Mailer</h1>
  <strong>TypeScript serverless app for sending emails from Saleor.</strong>
</div>
<br />

## Local development

1. Setup required envs. You can copy `.env.example` to `.env` and adjust it.

   ```
   SALEOR_URL=<e.g. https://your.eu.saleor.cloud>
   STATIC_URL=<where from emails static images will be served>
   SQS_QUEUE_URL=

   AWS_ACCESS_KEY_ID=
   AWS_REGION=
   AWS_SECRET_ACCESS_KEY=
   SECRET_MANAGER_APP_CONFIG_PATH=<secret manager config name>
   ```

2. [`nvm use`](https://github.com/nvm-sh/nvm) - to set proper node version.
3. [`pnpm install`](https://pnpm.io/installation) - to install dependencies.
4. `pnpm dev` - to start the app.

## Docker

Alternatively, you can use docker to run the app.

1. Setup required envs. You can copy `.env.example` to `.env` and adjust it.

   ```
   SALEOR_URL=<e.g. https://your.eu.saleor.cloud>
   STATIC_URL=<where from emails static images will be served>
   SQS_QUEUE_URL=

   AWS_ACCESS_KEY_ID=
   AWS_REGION=
   AWS_SECRET_ACCESS_KEY=
   SECRET_MANAGER_APP_CONFIG_PATH=<secret manager config name>
   ```

2. `docker compose build` - build the app.
3. `docker compose run --rm --service-ports app` - run the app.

## Localstack

### Install [awscli-local](https://github.com/localstack/awscli-local)

```
  $ brew install awscli-local
```

or

```
  $ pip3 install awscli-local
```

### Running localstack

To run localstack in the background:

```
$ docker compose up localstack -d
```

On startup, a queue will be created automatically with name `nimara-mailer-queue`.

Also the script will confirm email ($FROM_EMAIL env) identity and domain ($FROM_DOMAIN env) identity.

Check the [init-aws.sh](/etc/init-aws.sh) script for more details.

### Helpful commands:

Creating queue:

```
$ awslocal sqs create-queue --region ap-southeast-1 --queue-name nimara-mailer-queue
```

Purging queue:

```
$ awslocal sqs purge-queue --region ap-southeast-1 --queue-url http://localhost:4566/000000000000/nimara-mailer-queue
```

Verifying email identity:

```
$ awslocal ses verify-email-identity --region ap-southeast-1 --email-address hello@mirumee.com --endpoint-url=http://localhost:4566
```

Verifying domain identity:

```
$ awslocal ses verify-domain-identity --region ap-southeast-1 --domain mirumee.com --endpoint-url=http://localhost:4566
```
