const VERSION_REG = /([a-zA-Z0-9_\d]+)$/;

export function isValidVersion(v: string): boolean {
  return VERSION_REG.test(v);
}

export function parseVersion(v: string): string {
  if (!isValidVersion(v)) {
    throw new Error(`Invalid version string: "${v}"`);
  }

  return v;
}
