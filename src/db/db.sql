CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  display_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT,
  phone_number TEXT,
  balance numeric(15,2) NOT NULL,
  registered_on TIMESTAMPTZ NOT NULL,
  registered_with VARCHAR(6) NOT NULL, -- (local, google)
  google_id TEXT UNIQUE
)