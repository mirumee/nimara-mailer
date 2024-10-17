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

<br >

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

<br >

## [Localstack](https://www.localstack.cloud/)

Localstack is used for local development to replace need of usage AWS services. Everything needed is automatically configured on container startup.

### Running localstack

To run localstack in the background:

```
$ docker compose up localstack -d
```

On startup:

- sqs queue will be created automatically with name `nimara-mailer-queue`.
- secret value will be created ($SECRET_MANAGER_APP_CONFIG_PATH env)
- email identity will be confirmed in SNS ($FROM_EMAIL env).
- domain will be confirmed in SNS ($FROM_DOMAIN env).

Check the [init-aws.sh](/etc/init-aws.sh) script for more details.

### Helpful commands:

Requires [awscli-local](https://github.com/localstack/awscli-local), to install:

```
$ brew install awscli-local
```

or

```
$ pip3 install awscli-local
```

#### Creating queue:

```
$ awslocal sqs create-queue --region ap-southeast-1 --queue-name nimara-mailer-queue
```

#### Purging queue:

```
$ awslocal sqs purge-queue --region ap-southeast-1 --queue-url http://localhost:4566/000000000000/nimara-mailer-queue
```

#### Verifying email identity:

```
$ awslocal ses verify-email-identity --region ap-southeast-1 --email-address hello@mirumee.com --endpoint-url=http://localhost:4566
```

#### Verifying domain identity:

```
$ awslocal ses verify-domain-identity --region ap-southeast-1 --domain mirumee.com --endpoint-url=http://localhost:4566
```

<br >

## Using AWS

You can use AWS services directly, without using localstack.

You will need:

- set your AWS envs:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
- create a [SQS queue](https://aws.amazon.com/sqs/) and set the `SQS_QUEUE_URL` env.
- create a [secret manager](https://aws.amazon.com/secrets-manager/) entry and set the `SECRET_MANAGER_APP_CONFIG_PATH` env. The initial secret should be pre populated with empty object `{}`.

<br >

## Email providers

To change the email provider, change the `EMAIL_PROVIDER` to the provider of your choice.
One of:

- AWS_SES
- NODE_MAILER

### [Amazon Simple Email Service](https://aws.amazon.com/ses/)

Set correct envs:

```
EMAIL_PROVIDER=AWS_SES

AWS_ACCESS_KEY_ID=<correct values>
AWS_REGION=<correct values>
AWS_SECRET_ACCESS_KEY=<correct values>
```

Moreover, in AWS you will have to:

- verify [domain identity](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html#just-verify-domain-proc) from `FROM_EMAIL` env.
- verify [email identity](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html#just-verify-email-proc) from `FROM_DOMAIN` env.

### [Nodemailer](https://nodemailer.com/)

Set correct envs:

```
EMAIL_PROVIDER=NODE_MAILER

SMTP_HOST=<correct values>
SMTP_PORT=<correct values>

// true for port 465, false for other ports
SMTP_SECURE=<correct values>

// optional
SMTP_USER=<correct values>
SMTP_PASSWORD=<correct values>
```

<br >

## Local mail testing

You can test your emails using dockerized [Mailpit](https://mailpit.axllent.org/). To make it work you will need to select a mail provider, which sends mails to the SMTP server.

You can use [nodemailer provider](#nodemailer) for that. Envs from the `.env.example` are sufficient to make it work.

Then simply run the container

```
$ docker compose up mailpit -d
```

You can access the mailbox at [http://localhost:8025/](http://localhost:8025/)

<br >

## Local email development

App is using [React Email](https://react.email/) for email templating.

To start development server run:

```
$ pnpm dev:emails
```

or using docker

```
$ docker compose up emails
```

Now you can see emails preview in the browser - [http://localhost:3002/](http://localhost:3002/)

<br />

### Tests

App is using [vitest](https://vitest.dev/) for testing.

To run tests:

```
$ pnpm test
```

or

```
$ pnpm test:watch
```
