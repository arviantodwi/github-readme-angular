import { TRepos } from './repos';

export type TUserResponse = {
  __typename: string;
  id: string;
  username: string;
  name: string | null;
  avatar: string;
};

export type TUserProfile = {
  username: string;
  name: string | null;
  avatar: string;
};

export interface IUser {
  id: number;
  type: string;
  profile: TUserProfile;
  repos?: TRepos[] | null;
  print(): void;
}
