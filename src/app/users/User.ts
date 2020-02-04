import { IUser, TUserProfile } from '../@types/user';
import { TRepos } from '../@types/repos';

export class User implements IUser {
  // Properties
  repos: TRepos[] | null;

  /**
   * User constructor
   * @param id
   * @param type
   * @param profile
   */
  constructor(
    public id: number,
    public type: string,
    public profile: TUserProfile
  ) {
    this.repos = null;
  }

  /**
   * Print user info on console
   */
  print(): void {
    console.log(`Username: ${this.profile.username}, ID: ${this.id}`);
  }
}
