import { checkEmail } from '.';

describe('Validate email address', () => {
  test.each([
    { email: '', valid: false }, // empty
    { email: 'abc@gmail.com', valid: true }, // basic email address format
    { email: 'asdfghjkl', valid: false }, // no @
    { email: '@abc@def.ghi', valid: false }, // starts with @
    { email: 'test@hyphen-domain.net', valid: true }, // domain contains a -
    { email: 'test@dot.domain.com', valid: true }, // multiple dots on domain
    { email: 'test.dot@gmail.com', valid: true }, // a dot on username
    { email: '.username@gmail.com', valid: false }, // username cannot start with a dot
    { email: 'username.@gmail.com', valid: false }, // username cannot end with a dot
    { email: 'username@new.domain', valid: true }, // new generic TLDs
    { email: 'user@[192.168.0.1]', valid: true }, // IP address domain
    { email: 'user@example.com', valid: false }, // domain prohibited in real email address
  ])('input: %s', (testCase) => {
    expect(checkEmail(testCase.email)).toBe(testCase.valid);
  });
});
