import { User } from './User';

describe('User', () => {
  it('should create an instance', () => {
    expect(
      new User(1232528, 'Test User', 'https://avatar.local/1232528')
    ).toBeTruthy();
  });
});
