// @ts-nocheck
// prettier-ignore
/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
import type * as Types from '../../schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AppIdQuery_app_App = { id: string };

export type AppIdQuery_Query = { app: AppIdQuery_app_App | null };


export type AppIdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AppIdQuery = AppIdQuery_Query;

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AppIdQueryDocument = new TypedDocumentString(`
    query AppIdQuery {
  app {
    id
  }
}
    `) as unknown as TypedDocumentString<AppIdQuery, AppIdQueryVariables>;