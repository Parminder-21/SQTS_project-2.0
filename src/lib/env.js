/**
 * Environment validation utility
 * Ensures all required environment variables are set on startup
 */

export function validateEnvironment() {
  const required = [
    'TURSO_DATABASE_URL',
    'TURSO_AUTH_TOKEN'
  ];

  const optional = [
    'JWT_SECRET',
    'ADMIN_PASSWORD',
    'NODE_ENV'
  ];

  const missing = [];

  // Check required variables
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

  // Log warnings for optional variables
  for (const envVar of optional) {
    if (!process.env[envVar]) {
      console.warn(`⚠️  Optional environment variable not set: ${envVar}`);
    }
  }

  // Validate NODE_ENV
  const validEnvironments = ['development', 'production', 'test'];
  const nodeEnv = process.env.NODE_ENV || 'development';

  if (!validEnvironments.includes(nodeEnv)) {
    console.warn(`⚠️  Invalid NODE_ENV: ${nodeEnv}. Using 'development' as default.`);
  }

  console.log(`✓ Environment validation passed (NODE_ENV: ${nodeEnv})`);
}
