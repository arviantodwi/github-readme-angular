import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { introspectionQueryResultData } from './graphql.schema';

const uri = 'https://api.github.com/graphql';
const token = '68a7f07a1423bf5fca5aa85119a720027b93327c';

export function createApollo(httpLink: HttpLink) {
  const headers = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
      Authorization: `Bearer ${token}`
    }
  }));
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });
  const link = ApolloLink.from([headers, httpLink.create({ uri })]);
  const cache = new InMemoryCache({ fragmentMatcher });

  return { link, cache };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
