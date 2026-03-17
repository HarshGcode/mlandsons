import { createClient } from '@supabase/supabase-js';
import { secureHandler } from './_security.js';

// One-time setup endpoint to create the contacts table
// Call this ONCE after deploying: GET /api/setup-db
// Then remove or disable this endpoint

async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Create the contacts table using Supabase's SQL editor via RPC
    // Note: You should run this SQL in Supabase Dashboard > SQL Editor instead:
    const { error } = await supabase.rpc('exec_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email VARCHAR(100),
          state VARCHAR(50),
          city VARCHAR(50),
          address TEXT,
          inquiry_type VARCHAR(50),
          item_type VARCHAR(50),
          details TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `
    });

    if (error) {
      // If RPC doesn't exist, tell user to create table manually
      return res.status(200).json({
        success: false,
        message: 'Please create the contacts table manually in Supabase Dashboard > SQL Editor. Copy the SQL from below.',
        sql: `CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  state VARCHAR(50),
  city VARCHAR(50),
  address TEXT,
  inquiry_type VARCHAR(50),
  item_type VARCHAR(50),
  details TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Database table "contacts" created successfully!'
    });
  } catch (err) {
    console.error('Setup DB error:', err);
    return res.status(500).json({ error: 'Failed to setup database', details: err.message });
  }
}

export default secureHandler(handler, { allowedMethods: ['GET'] });
