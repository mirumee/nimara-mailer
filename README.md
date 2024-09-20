## Local development

Setup required envs:

```
SALEOR_URL=https://your.eu.saleor.cloud
```

Build the app:

`$ docker compose build`

Now, you can run all of the containers in the background:

`$ docker compose up -d`

And show the output of the app:

`$ docker compose logs app -f`

### Debugging

Open chrome at [chrome://inspect/#devices](chrome://inspect/#devices) and you should se the app running. Click the inspect link and the chrome console should pop out with the debugger being attached.
More info [here](https://blog.risingstack.com/how-to-debug-a-node-js-app-in-a-docker-container/)

### Drizzle

Generate migrations

`$ docker compose run --rm app db:migrate`

Apply migrations

`$ docker compose run --rm app db:push`

### Graphql codegen

`$ docker compose run --rm app codegen`

---

### Serverless

1. Add your credentials to [`~/.aws/credentials`](https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html)

2. Build the package:
   `$ ./etc/build.sh

3. Deploy zip to AWS Lambda:
   `$ aws lambda update-function-code --profile [YOUR PROFILE] --function-name [YOUR FUNCTION NAME] --zip-file fileb://artifact.zip`

TODO:

- [ ] Remove graphql yoga & related pacakges
- [ ] Proper readme
- [ ] Commitizen for jira
- [ ] esbuild for both lambdas

````

## Plugins

To enable one of the plugins, add it to the `plugins` array in `src/server.ts`.

### AWS Secret Manager

This plugin is used to retrieve secrets from AWS Secrets Manager. It exposes a `secretsManager` client object on the server instance, and `secretsManagerConfigPath` (secret name) on the server instance.

To enable it, add the following to the `plugins` array in `src/server.ts`:

```ts
import AWSSecretManagerPlugin from "@/lib/plugins/awsSecretManagerPlugin";

for (const [plugin, opts] of [
  (...)
  [AWSSecretManagerPlugin, {}],
  (...)
]) {
````

The plugin will look for the following environment variables:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

---

### Drizzle

This plugin is used to manage the database connection. It exposes a `db` object on the server instance, which can be used to run postgress queries.

To enable it, add the following to the `plugins` array in `src/server.ts:67`:

```ts
import DrizzlePlugin from "@/lib/plugins/drizzlePlugin";

for (const [plugin, opts] of [
  (...)
  [DrizzlePlugin, {}],
  (...)
]) {
```

The plugin will look for the following environment variables:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

---

### Url

This plugin is used to generate URLs for the app. It exposes a `appUrl` and `urlFull` properties on the server instance, where:

- `appUrl` === `http://domain.com`
- `urlFull` === `http://domain.com/current/path`

To enable it, add the following to the `plugins` array in `src/server.ts:67`:

```ts
import UrlPlugin from "@/lib/plugins/urlPlugin";

for (const [plugin, opts] of [
  (...)
  [UrlPlugin, {}],
  (...)
]) {
```

---

### UrlFor

This plugin is used to generate URLs for the app. When enabled, it will add a `urlFor` function to the request instance, which can be used to generate paths for the app via given route name.
Caveat: this plugin requires `urlPlugin` to be installed.

To enable it, add the following to the `plugins` array in `src/server.ts:67`:

```ts
import UrlForPlugin from "@/lib/plugins/urlForPlugin";

for (const [plugin, opts] of [
  (...)
  [UrlForPlugin, {}],
  (...)
])
```

Usage:

```
fastify.withTypeProvider<ZodTypeProvider>().post(
  "/register",
  {
    name: "saleor:register",
  },
```

Then simply in the code:

```
request.urlFor("saleor:register")
```

Which results in:

```
https://your.app.com/register
```

## Providers

### Config providers

The app supports two types of config providers and u can choose the right one for you

### Secrets manager

This provider stores the app secrets and configuration in AWS Secrets Manager. To use enable it:

1. Enable `AWSSecretManagerPlugin`.
2. Adjust the `getConfigProvider` in `/src/lib/saleor/config/provider.ts`o

```ts
import { SaleorSecretsManagerConfigProvider } from "./secretsManager";

export const getConfigProvider = ({ server }: { server: FastifyInstance }) => SaleorSecretsManagerConfigProvider({
  secretsManagerConfigPath: server.secretsManagerConfigPath,
  secretsManager: server.secretsManager,
});
```

---

### Drizzle

This provider stores the app secrets and configuration in postgress database. To use enable it:

1. Enable `DrizzlePlugin`.
2. Adjust the `getConfigProvider` in `/src/lib/saleor/config/provider.ts`o

```ts
import { SaleorDrizzleConfigProvider } from "./drizzle";

export const getConfigProvider = ({ server }: { server: FastifyInstance }) =>
  SaleorDrizzleConfigProvider({
    db: server.db,
  });

```
