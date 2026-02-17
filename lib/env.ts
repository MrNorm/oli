const requiredEnvVars = {
  VITE_CMS_API_URL: 'PayloadCMS GraphQL API URL',
  VITE_CDN_URL: 'CDN URL for media files',
} as const;

export function validateEnv(): void {
  const missing: string[] = [];

  for (const [key, description] of Object.entries(requiredEnvVars)) {
    if (!import.meta.env[key]) {
      missing.push(`${key} (${description})`);
    }
  }

  if (missing.length > 0) {
    const errorMsg = [
      'Missing required environment variables:',
      ...missing.map(v => `  - ${v}`),
      '\nCopy .env.example to .env and configure the values.',
    ].join('\n');
    
    throw new Error(errorMsg);
  }
}

export function getEnv(key: keyof typeof requiredEnvVars): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}
