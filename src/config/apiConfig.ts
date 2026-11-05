/**
 * Test configuration file containing simulated dummy credentials
 * Purpose: Verify CodeRabbit and automated secret scanning detection
 */

export const API_CONFIG = {
  // Simulated AWS IAM Credentials (using official AWS documentation sample format)
  awsAccessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  awsSecretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',

  // Simulated Payment Gateway Secret
  stripeSecretKey: 'sk_test_51MzFakeKeyForTestingPurposesOnly000',

  // Simulated Internal Database Connection String with hardcoded credentials
  databaseUrl: 'postgresql://db_admin:P@ssw0rd2026_Enterprise!@db.internal:5432/prod_db',

  // Simulated JWT Signing Secret
  jwtSecretToken: 'super-secret-jwt-signing-key-do-not-expose-9876543210',
};

