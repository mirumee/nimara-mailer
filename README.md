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
