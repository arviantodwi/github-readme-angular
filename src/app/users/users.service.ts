import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const fUserFields = (object: string) => {
  return gql`
    fragment ${object.toLowerCase()}Fields on ${object} {
      id
      username: login
      name
      avatar: avatarUrl
    }
  `;
};
const qGetUsers = gql`
  query getUsers($username: String!) {
    search(query: $username, type: USER, first: 10) {
      users: nodes {
        __typename
        ... on User {
          ...userFields
        }
        ... on Organization {
          ...organizationFields
        }
      }
    }
  }
  ${fUserFields('User')}
  ${fUserFields('Organization')}
`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * Service constructor
   * @param apollo Apollo instance
   */
  constructor(private apollo: Apollo) {}

  /**
   * Get users from Github GraphQL API
   * @param username User search keyword
   */
  getUsers(username: string): Observable<Apollo> {
    return this.apollo
      .watchQuery<Response>({
        query: qGetUsers,
        variables: {
          username
        }
      })
      .valueChanges.pipe(map((response: any) => response));
  }
}
