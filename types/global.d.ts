import { type JSONWebKeySet } from "jose";

declare global {
  var JWKS_CACHE: Record<string, JSONWebKeySet>;
}

export {};
