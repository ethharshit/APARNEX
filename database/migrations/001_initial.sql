CREATE TABLE IF NOT EXISTS enquiries (
 id text PRIMARY KEY, idempotency_key text NOT NULL UNIQUE,
 full_name text NOT NULL, company text NOT NULL, email text NOT NULL,
 phone text NOT NULL, city text NOT NULL, state text NOT NULL, country text NOT NULL,
 type text NOT NULL, subject text NOT NULL, message text NOT NULL, consent_at text NOT NULL,
 status text NOT NULL DEFAULT 'New' CHECK (status IN ('New','In Progress','Responded','Closed')),
 notes text NOT NULL DEFAULT '', notification text NOT NULL DEFAULT 'unconfigured',
 created_at text NOT NULL, updated_at text NOT NULL
);
CREATE TABLE IF NOT EXISTS rate_limits (key text PRIMARY KEY,count integer NOT NULL,expires_at bigint NOT NULL);
CREATE TABLE IF NOT EXISTS content_settings (key text PRIMARY KEY,value text NOT NULL,updated_at text NOT NULL);
CREATE INDEX IF NOT EXISTS enquiries_created_idx ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries(status);
-- Block direct browser access through Supabase REST. Server connection uses a privileged DB role.
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_settings ENABLE ROW LEVEL SECURITY;
