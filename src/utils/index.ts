export * from './storage';

/**
 * Checks if email address is valid.
 * This check allows all valid email addresses including rare formats (and some invalid ones).
 * @param email email address string
 * @returns true if email is valid, false otherwise
 */
export function checkEmail(email: string): boolean {
  /* easy check -- since email addresses should have the following:
      - username (before @)
      - the character @
      - domain (after @)
      it should be at least 3 characters long
  */
  if (email.length < 3) {
    return false;
  }

  // email should include @,
  // and it should not be at the beginning or the end
  if (email.includes('@') && (email.startsWith('@') || email.endsWith('@'))) {
    return false;
  }

  // split the email to username (before @) and domain (after @)
  const lastAt = email.lastIndexOf('@');
  const username = email.slice(0, lastAt);
  const domain = email.slice(lastAt + 1);

  // username cannot begin or end with a dot
  if (username.startsWith('.') || username.endsWith('.')) {
    return false;
  }

  // forbidden domain names
  if (
    domain.endsWith('.test') ||
    domain.endsWith('.example') ||
    domain.endsWith('.invalid') ||
    domain.endsWith('.localhost') ||
    domain.endsWith('example.com') ||
    domain.endsWith('example.net') ||
    domain.endsWith('example.org')
  ) {
    return false;
  }

  return true;
}

/**
 * Converts a boolean into a promise
 * @param bool `true` to return a resolved promise, `false` to return a rejected promise
 * @param rejectReason (optional) the reason the promise was rejected
 * @returns {Promise<void>} a resolved or rejected `Promise<void>`
 */
export function bool2promise(
  bool: boolean,
  rejectReason?: string
): Promise<void> {
  if (bool) {
    return Promise.resolve();
  } else {
    return Promise.reject(rejectReason);
  }
}
