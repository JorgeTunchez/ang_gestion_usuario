import { ObfuscatePasswordPipe } from './obfuscate-password.pipe';

describe('ObfuscatePasswordPipe', () => {
  it('create an instance', () => {
    const pipe = new ObfuscatePasswordPipe();
    expect(pipe).toBeTruthy();
  });
});
