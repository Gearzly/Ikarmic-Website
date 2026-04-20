/**
 * Seed an admin user into the database.
 * Usage:  node scripts/seed-admin.mjs <username> <password> [role]
 * Role defaults to 'superadmin' for the first user.
 *
 * Requires env vars: MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
 * Load from .env.local:  node --env-file=.env.local scripts/seed-admin.mjs admin mypassword
 */

import { createPool } from 'mysql2/promise'
import bcrypt from 'bcrypt'

const [, , username, password, role] = process.argv

if (!username || !password) {
  console.error(
    'Usage: node scripts/seed-admin.mjs <username> <password> [role]',
  )
  console.error('  role: superadmin | admin (default: superadmin)')
  process.exit(1)
}

if (password.length < 8) {
  console.error('Error: Password must be at least 8 characters.')
  process.exit(1)
}

const userRole = role === 'admin' ? 'admin' : 'superadmin'

const pool = createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || '',
  connectionLimit: 1,
})

try {
  // Ensure table exists
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      username      VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role          VARCHAR(20) NOT NULL DEFAULT 'admin',
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login_at DATETIME NULL
    )
  `)

  const hash = await bcrypt.hash(password, 12)
  await pool.execute(
    'INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)',
    [username, hash, userRole],
  )
  console.log(`✓ Admin user "${username}" created with role "${userRole}".`)
} catch (err) {
  if (err.code === 'ER_DUP_ENTRY') {
    console.error(`Error: Username "${username}" already exists.`)
  } else {
    console.error('Error:', err.message)
  }
  process.exit(1)
} finally {
  await pool.end()
}
