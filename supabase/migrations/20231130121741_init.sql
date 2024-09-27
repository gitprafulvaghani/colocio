CREATE TYPE onboarding_status AS enum('not_started', 'started', 'completed');

CREATE TYPE user_status AS enum(
  'active',
  'suspended',
  'payment_failed',
  'pending_verification',
  'inactive',
  'paused'
);

CREATE TYPE social_platforms AS enum('facebook', 'google')

