/**
 * Environment validation utility
 * Ensures all required environment variables are set on startup
 */

export function validateEnvironment() {
  const required = [
    'TURSO_DATABASE_URL',
    'TURSO_AUTH_TOKEN',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
  ];

  const optional = [
    'ADMIN_PASSWORD_HASH',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
    'NODE_ENV',
  ];

  const missing = [];

  for (const envVar of required) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please add them to your .env.local file.`
    );
  }

  for (const envVar of optional) {
    if (!process.env[envVar]) {
      console.warn(`⚠️  Optional environment variable not set: ${envVar}`);
    }
  }

  const validEnvironments = ['development', 'production', 'test'];
  const nodeEnv = process.env.NODE_ENV || 'development';

  if (!validEnvironments.includes(nodeEnv)) {
    console.warn(`⚠️  Invalid NODE_ENV: ${nodeEnv}. Using 'development' as default.`);
  }

  console.log(`✓ Environment validation passed (NODE_ENV: ${nodeEnv})`);
}
