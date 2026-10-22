-- Additive, rerunnable upgrade. Existing rows, statuses and messages are preserved.
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS product text NOT NULL DEFAULT '';
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS updated_by text NOT NULL DEFAULT '';
ALTER TABLE enquiries DROP CONSTRAINT IF EXISTS enquiries_status_check;
-- Responded remains valid for historical records and older deployed clients.
ALTER TABLE enquiries ADD CONSTRAINT enquiries_status_check
 CHECK (status IN ('New','Contacted','In Progress','Closed','Responded'));
CREATE INDEX IF NOT EXISTS enquiries_product_idx ON enquiries(product);
