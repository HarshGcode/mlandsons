DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS gift_packages CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS platform_stats CASCADE;

CREATE TABLE categories (
  id VARCHAR(30) PRIMARY KEY,
  label VARCHAR(50) NOT NULL,
  icon VARCHAR(10)
);

CREATE TABLE products (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL REFERENCES categories(id),
  denomination VARCHAR(20),
  year INTEGER,
  serial_number VARCHAR(50),
  condition VARCHAR(10),
  price INTEGER NOT NULL,
  original_price INTEGER,
  rarity VARCHAR(30),
  description TEXT,
  historical_info TEXT,
  grading_details TEXT,
  tags TEXT[],
  gradient VARCHAR(255),
  accent_color VARCHAR(20),
  image VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  is_custom BOOLEAN DEFAULT false,
  is_set BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gift_packages (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  occasion VARCHAR(50),
  description TEXT,
  includes TEXT[],
  price INTEGER NOT NULL,
  icon VARCHAR(10),
  color VARCHAR(20),
  popular BOOLEAN DEFAULT false
);

CREATE TABLE blog_posts (
  id VARCHAR(10) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  category VARCHAR(50),
  read_time VARCHAR(20),
  date DATE,
  icon VARCHAR(10),
  featured BOOLEAN DEFAULT false,
  tags TEXT[]
);

CREATE TABLE platform_stats (
  id SERIAL PRIMARY KEY,
  value VARCHAR(20) NOT NULL,
  label VARCHAR(50) NOT NULL,
  icon VARCHAR(10)
);

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  state VARCHAR(50),
  city VARCHAR(50),
  address TEXT,
  inquiry_type VARCHAR(50),
  item_type VARCHAR(50),
  details TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
