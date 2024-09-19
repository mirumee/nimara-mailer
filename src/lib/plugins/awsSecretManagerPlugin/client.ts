import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

/**
 * Envs are injected automatically by @aws-sdk - no need to pass them explicitly.
 */
export const secretsManagerClient = new SecretsManagerClient();
